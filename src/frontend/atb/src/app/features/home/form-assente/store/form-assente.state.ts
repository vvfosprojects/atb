import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SaveNewSuspectCase, SetPageTitleFormAssente, UpdateSuspectCase } from './form-assente.actions';
import { AssentiService } from '../../../../core/services/assenti/assenti.service';
import { Navigate } from "@ngxs/router-plugin";
import { formatDate } from "../../../../shared/functions/functions";

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
            actualWorkReturnDate: null;
            closedCase: boolean;
        };
        status?: string;
    };
}

export const formAssenteStateDefaults: FormAssenteStateModel = {
    pageTitle: 'nuovo assente',
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

    constructor(private assentiService: AssentiService) {
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
        const objSubject = {
            number: assenteFormValue.caseNumber,
            name: assenteFormValue.name,
            surname: assenteFormValue.surname,
            email: assenteFormValue.email,
            phone: assenteFormValue.phone.toString(),
            role: assenteFormValue.role,
            closedCase: assenteFormValue.closedCase
        };
        this.assentiService.newSuspectCase(objSubject).subscribe(() => {
            const objData = {
                caseNumber: assenteFormValue.caseNumber,
                quarantinePlace: assenteFormValue.quarantinePlace,
                expectedWorkReturnDate: formatDate(assenteFormValue.expectedWorkReturnDate),
                closedCase: assenteFormValue.closedCase
            };
            this.assentiService.newSuspectUpdate(objData).subscribe(() => {
                dispatch(new Navigate(['./home/ricerca']));
            });
        });
    }

    @Action(UpdateSuspectCase)
    updateSuspectCase({ getState, dispatch }: StateContext<FormAssenteStateModel>) {
        const assenteFormValue = getState().assenteForm.model;
        const objSubject = {
            number: assenteFormValue.caseNumber,
            name: assenteFormValue.name,
            surname: assenteFormValue.surname,
            email: assenteFormValue.email,
            phone: assenteFormValue.phone.toString(),
            role: assenteFormValue.role,
            closedCase: assenteFormValue.closedCase
        };
        this.assentiService.newSuspectCase(objSubject).subscribe(() => {
            const objData = {
                caseNumber: assenteFormValue.caseNumber,
                quarantinePlace: assenteFormValue.quarantinePlace,
                expectedWorkReturnDate: formatDate(assenteFormValue.expectedWorkReturnDate),
                closedCase: assenteFormValue.closedCase
            };
            this.assentiService.newSuspectUpdate(objData).subscribe(() => {
                dispatch(new Navigate(['./home/ricerca']));
            });
        });
    }
}
