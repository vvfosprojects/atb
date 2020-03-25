import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SaveNewSuspectCase, SetPageTitleFormAssente, UpdateSuspectCase } from './form-assente.actions';
import { AssentiService } from '../../../core/services/assenti/assenti.service';
import { Navigate } from '@ngxs/router-plugin';
import { formatDate } from '../../../shared/functions/functions';
import { DtoNewSuspectCaseInterface } from '../../../shared/interface/dto-new-suspect-case.interface';
import { DtoNewSuspectUpdateInterface } from '../../../shared/interface/dto-new-suspect-update.interface';
import { CaseNumberModalComponent } from '../../../shared/components/case-number-modal/case-number-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface FormAssenteStateModel {
    pageTitle: string;
    assenteForm: {
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
            quarantinePlace: string;
            intensiveTerapy: boolean;
            expectedWorkReturnDate: string;
            actualWorkReturnDate: string;
            healthMeasureCode: string;
            healthMeasureBy: string;
        };
        status?: string;
    };
}

export const formAssenteStateDefaults: FormAssenteStateModel = {
    pageTitle: 'nuovo sorvegliato',
    assenteForm: {
        model: undefined
    }
};

@Injectable()
@State<FormAssenteStateModel>({
    name: 'assente',
    defaults: formAssenteStateDefaults
})
export class FormAssenteState {

    @Selector()
    static pageTitle(state: FormAssenteStateModel) {
        return state.pageTitle;
    }

    @Selector()
    static assenteFormValid(state: FormAssenteStateModel) {
        return state.assenteForm.status === 'VALID';
    }

    constructor(private assentiService: AssentiService, private modal: NgbModal) {
    }

    @Action(SetPageTitleFormAssente)
    setPageTitleFormAssente({ patchState }: StateContext<FormAssenteStateModel>, action: SetPageTitleFormAssente) {
        patchState({
            pageTitle: action.title
        });
    }

    @Action(SaveNewSuspectCase)
    saveNewSuspectCase({ getState, dispatch }: StateContext<FormAssenteStateModel>) {
        const assenteFormValue = getState().assenteForm.model;
        const objSubject: DtoNewSuspectCaseInterface = {
            number: assenteFormValue.caseNumber,
            name: assenteFormValue.name,
            surname: assenteFormValue.surname,
            email: assenteFormValue.email,
            phone: assenteFormValue.phone ? assenteFormValue.phone.toString() : assenteFormValue.phone,
            role: assenteFormValue.role
        };
        this.assentiService.newSuspectCase(objSubject).subscribe((resNewSuspectCase: { caseNumber: number }) => {
            const objData: DtoNewSuspectUpdateInterface = {
                caseNumber: resNewSuspectCase.caseNumber,
                quarantinePlace: assenteFormValue.quarantinePlace,
                expectedWorkReturnDate: formatDate(assenteFormValue.expectedWorkReturnDate),
                actualWorkReturnDate: assenteFormValue.actualWorkReturnDate ? formatDate(assenteFormValue.actualWorkReturnDate) : null,
                healthMeasure: {
                    code: assenteFormValue.healthMeasureCode,
                    by: assenteFormValue.healthMeasureBy
                }
            };
            this.assentiService.newSuspectUpdate(objData).subscribe(() => {
                dispatch(new Navigate(['./home/ricerca']));
                const m = this.modal.open(CaseNumberModalComponent, { centered: true, size: 'lg', backdropClass: 'backdrop-custom-black' });
                m.componentInstance.title = 'Inserimento Nuovo Caso Sorvegliato';
                m.componentInstance.caseNumber = resNewSuspectCase.caseNumber;
            });
        });
    }

    @Action(UpdateSuspectCase)
    updateSuspectCase({ getState, dispatch }: StateContext<FormAssenteStateModel>) {
        const assenteFormValue = getState().assenteForm.model;
        const objData: DtoNewSuspectUpdateInterface = {
            caseNumber: assenteFormValue.caseNumber,
            quarantinePlace: assenteFormValue.quarantinePlace,
            expectedWorkReturnDate: formatDate(assenteFormValue.expectedWorkReturnDate),
            actualWorkReturnDate: assenteFormValue.actualWorkReturnDate ? formatDate(assenteFormValue.actualWorkReturnDate) : null,
            healthMeasure: {
                code: assenteFormValue.healthMeasureCode,
                by: assenteFormValue.healthMeasureBy
            }
        };
        this.assentiService.newSuspectUpdate(objData).subscribe(() => {
            dispatch(new Navigate(['./home/ricerca']));
        });
    }
}
