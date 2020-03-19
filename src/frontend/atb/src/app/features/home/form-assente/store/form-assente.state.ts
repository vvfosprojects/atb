import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SaveNewSuspectCase, SetPageTitleFormAssente } from './form-assente.actions';
import { AssentiService } from '../../../../core/services/assenti/assenti.service';
import { Navigate } from "@ngxs/router-plugin";

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
        const obj = {
            number: assenteFormValue.caseNumber,
            name: assenteFormValue.name,
            surname: assenteFormValue.surname,
            email: assenteFormValue.email,
            phone: assenteFormValue.phone.toString(),
            role: assenteFormValue.role,
            closedCase: false
        };
        this.assentiService.newSuspectCase(obj).subscribe(() => {
            const obj2 = {
                caseNumber: assenteFormValue.caseNumber,
                quarantinePlace: assenteFormValue.quarantinePlace,
                expectedWorkReturnDate: formatDate(assenteFormValue.expectedWorkReturnDate),
                closedCase: false
            };
            this.assentiService.newSuspectUpdate(obj2).subscribe(() => {
                dispatch(new Navigate(['./home/ricerca']));
            });
        });
    }
}

function formatDate(data: any) {
    const year = data.year;
    const month = data.month.toString().length > 1 ? data.month : '0' + data.month;
    const day = data.day.toString().length > 1 ? data.day : '0' + data.day;
    return year + '-' + month + '-' + day;
}
