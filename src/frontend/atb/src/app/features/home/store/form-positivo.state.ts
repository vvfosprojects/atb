import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
    ClearFormPositivo,
    SaveNewPositivoCase,
    SetPageTitleFormPositivo,
    SetPositivoDeceased,
    UpdatePositivoCase
} from './form-positivo.actions';
import { Injectable } from '@angular/core';
import { formatDate } from '../../../shared/functions/functions';
import { Navigate } from '@ngxs/router-plugin';
import { PositiviService } from '../../../core/services/positivi/positivi.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseNumberModalComponent } from '../../../shared/components/case-number-modal/case-number-modal.component';
import {
    DtoNewPositiveCaseInterface,
    DtoNewPositiveUpdateInterface,
    NewPositiveResponseInterface
} from '../../../shared/interface';
import { forkJoin, of } from 'rxjs';
import { ClearConvertCase } from './convert-case.actions';
import { InputModalCaseInterface } from '../../../shared/interface/common/input-modal-case.interface';

export interface FormPositivoStateModel {
    pageTitle: string;
    positivoForm: {
        model?: {
            // Personal Information
            name: string;
            surname: string;
            email: string;
            phone: string;
            role: string;
            // Personal Data
            caseNumber: number;
            estremiProvvedimentiASL: string;
            diseaseConfirmDate: string;
            quarantinePlace: string;
            intensiveTerapy: boolean;
            expectedWorkReturnDate: string;
            actualWorkReturnDate: string;
        };
        status?: string;
    };
    deceased: string;
}

export const formPositivoStateDefaults: FormPositivoStateModel = {
    pageTitle: 'nuovo positivo',
    positivoForm: {
        model: undefined
    },
    deceased: null
};

@Injectable()
@State<FormPositivoStateModel>({
    name: 'positivo',
    defaults: formPositivoStateDefaults
})
export class FormPositivoState {

    @Selector()
    static pageTitle(state: FormPositivoStateModel) {
        return state.pageTitle;
    }

    @Selector()
    static positivoFormValid(state: FormPositivoStateModel) {
        return state.positivoForm.status === 'VALID';
    }

    constructor(private positiviService: PositiviService, private modal: NgbModal) {
    }

    @Action(SetPageTitleFormPositivo)
    setPageTitleFormPositivo({ patchState }: StateContext<FormPositivoStateModel>, action: SetPageTitleFormPositivo) {
        patchState({
            pageTitle: action.title
        });
    }

    @Action(SaveNewPositivoCase)
    saveNewPositivoCase({ getState, dispatch }: StateContext<FormPositivoStateModel>, { link }: SaveNewPositivoCase) {
        const positivoFormValue = getState().positivoForm.model;
        const objSubject: DtoNewPositiveCaseInterface = {
            number: positivoFormValue.caseNumber,
            name: positivoFormValue.name,
            surname: positivoFormValue.surname,
            email: positivoFormValue.email,
            phone: '' + positivoFormValue.phone,
            role: positivoFormValue.role
        };
        this.positiviService.newPositiveCase(objSubject).subscribe((resNewPositiveCase: NewPositiveResponseInterface) => {
            const objData: DtoNewPositiveUpdateInterface = {
                caseNumber: resNewPositiveCase.caseNumber,
                estremiProvvedimentiASL: positivoFormValue.estremiProvvedimentiASL,
                diseaseConfirmDate: positivoFormValue.diseaseConfirmDate ? formatDate(positivoFormValue.diseaseConfirmDate) : null,
                quarantinePlace: positivoFormValue.quarantinePlace === 'HOSP' && positivoFormValue.intensiveTerapy ? 'INTCARE' : positivoFormValue.quarantinePlace,
                expectedWorkReturnDate: positivoFormValue.expectedWorkReturnDate ? formatDate(positivoFormValue.expectedWorkReturnDate) : null,
                actualWorkReturnDate: positivoFormValue.actualWorkReturnDate ? formatDate(positivoFormValue.actualWorkReturnDate) : null,
                link
            };
            this.positiviService.newPositiveUpdate(objData).subscribe(() => {
                dispatch(new Navigate([ './home/ricerca' ]));
                const mInput: InputModalCaseInterface = {
                    title: 'Inserimento Nuovo Caso Positivo COVID',
                    caseNumber: resNewPositiveCase.caseNumber,
                    exMsg: link ? '(ex Sospetto)' : ''
                };
                this.openCase(mInput).then();
            });
        });
    }

    @Action(UpdatePositivoCase)
    updatePositivoCase({ getState, dispatch }: StateContext<FormPositivoStateModel>) {
        const state = getState();
        const positivoFormValue = state.positivoForm.model;
        const objData: DtoNewPositiveUpdateInterface = {
            caseNumber: positivoFormValue.caseNumber,
            estremiProvvedimentiASL: positivoFormValue.estremiProvvedimentiASL,
            diseaseConfirmDate: positivoFormValue.diseaseConfirmDate ? formatDate(positivoFormValue.diseaseConfirmDate) : null,
            quarantinePlace: positivoFormValue.quarantinePlace === 'HOSP' && positivoFormValue.intensiveTerapy ? 'INTCARE' : positivoFormValue.quarantinePlace,
            expectedWorkReturnDate: positivoFormValue.expectedWorkReturnDate ? formatDate(positivoFormValue.expectedWorkReturnDate) : null,
            actualWorkReturnDate: positivoFormValue.actualWorkReturnDate ? formatDate(positivoFormValue.actualWorkReturnDate) : null
        };
        const objSubject: DtoNewPositiveCaseInterface = {
            number: positivoFormValue.caseNumber,
            name: positivoFormValue.name,
            surname: positivoFormValue.surname,
            email: positivoFormValue.email,
            phone: '' + positivoFormValue.phone,
            role: positivoFormValue.role
        };
        console.log('UpdatePositivoCase', objSubject, objData);
        const updatePositiveCase = this.positiviService.updatePositiveCase(objSubject);
        const newPositiveUpdate = state.deceased ? of(null) : this.positiviService.newPositiveUpdate(objData);
        forkJoin([ updatePositiveCase, newPositiveUpdate ]).subscribe(result => {
            if (result) {
                dispatch(new Navigate([ './home/ricerca' ]));
            }
        });
    }

    @Action(SetPositivoDeceased)
    setPositivoDeceased({ patchState }: StateContext<FormPositivoStateModel>, { deceased }: SetPositivoDeceased) {
        patchState({ deceased });
    }

    @Action(ClearFormPositivo)
    clearFormPositivo({ dispatch, patchState }: StateContext<FormPositivoStateModel>) {
        dispatch(new ClearConvertCase('form-positivo'));
        patchState(formPositivoStateDefaults);
    }

    openCase(inputModal: InputModalCaseInterface): Promise<any> {
        const m = this.modal.open(CaseNumberModalComponent, {
            centered: true,
            size: 'lg',
            backdropClass: 'backdrop-custom-black'
        });
        m.componentInstance.title = inputModal.title;
        m.componentInstance.caseNumber = inputModal.caseNumber;
        m.componentInstance.detail = inputModal.detail;
        return m.result;
    }

}
