import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
    ClearFormPositivo, ConvertPositiveCase,
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
    DtoNewPositiveUpdateInterface, InputModalCaseInterface, LinkCaseInterface,
    NewPositiveResponseInterface
} from '../../../shared/interface';
import { forkJoin, of } from 'rxjs';
import { ClearConvertCase, SetConvertCase, SetLink, SetSubject } from './convert-case.actions';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { SearchSuspectCase } from './search.actions';

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
                link,
                convertToSuspect: false
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

    @Action(ConvertPositiveCase)
    convertPositiveCase({ dispatch }: StateContext<FormPositivoStateModel>) {
        const m = this.modal.open(ConfirmModalComponent, {
            centered: true,
            size: 'lg',
            backdropClass: 'backdrop-custom-black'
        });
        m.componentInstance.title = 'Conversione in Caso Sorvegliato';
        m.componentInstance.message = 'Sei sicuro di voler convertire il caso Positivo in Sorvegliato?';
        m.result.then((modalResult: string) => {
            if (modalResult && modalResult === 'confirm') {
                dispatch(new UpdatePositivoCase(true));
            }
        }, () => console.log('closed'));
    }

    @Action(UpdatePositivoCase)
    updatePositivoCase({ getState, dispatch }: StateContext<FormPositivoStateModel>, { convertToSuspect }: UpdatePositivoCase) {
        const state = getState();
        const positivoFormValue = state.positivoForm.model;
        const objData: DtoNewPositiveUpdateInterface = {
            caseNumber: positivoFormValue.caseNumber,
            estremiProvvedimentiASL: positivoFormValue.estremiProvvedimentiASL,
            diseaseConfirmDate: positivoFormValue.diseaseConfirmDate ? formatDate(positivoFormValue.diseaseConfirmDate) : null,
            quarantinePlace: positivoFormValue.quarantinePlace === 'HOSP' && positivoFormValue.intensiveTerapy ? 'INTCARE' : positivoFormValue.quarantinePlace,
            expectedWorkReturnDate: positivoFormValue.expectedWorkReturnDate ? formatDate(positivoFormValue.expectedWorkReturnDate) : null,
            actualWorkReturnDate: positivoFormValue.actualWorkReturnDate ? formatDate(positivoFormValue.actualWorkReturnDate) : null,
            convertToSuspect
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
                if (!state.deceased) {
                    if (convertToSuspect && result[1].suspectSheetNum === null) {
                        console.log('Init ConvertSuspect');
                        const link: LinkCaseInterface = { caseNumber: objData.caseNumber, closed: false };
                        dispatch([
                            new SetLink(link),
                            new SetSubject(objSubject),
                            new SetConvertCase('form-assente')
                        ]);
                    } else if (convertToSuspect && result[1].suspectSheetNum) {
                        dispatch(new Navigate([ './home/ricerca' ]));
                        const mInput: InputModalCaseInterface = {
                            title: 'Convertito in Caso Sorvegliato',
                            caseNumber: result[1].suspectSheetNum,
                            detail: true
                        };
                        this.openCase(mInput).then((modalResult: string) => {
                            if (modalResult && modalResult === 'onDetail') {
                                dispatch(new SearchSuspectCase('' + result[1].suspectSheetNum));
                            }
                        }, () => console.log('closed'));
                    }
                } else {
                    dispatch(new Navigate([ './home/ricerca' ]));
                }
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
        m.componentInstance.exMsg = inputModal.exMsg;
        return m.result;
    }

}
