import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SaveNewSuspectCase, SetPageTitleFormAssente } from './form-assente.actions';
import { AssentiService } from '../../../../core/services/assenti/assenti.service';

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
    name: 'formAssente',
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
    saveNewSuspectCase({ getState }: StateContext<FormAssenteStateModel>) {
        const assenteFormValue = getState().assenteForm.model;
        console.log('SaveNewSuspectCase',
            assenteFormValue
        );
        // todo: logica per il save
        const obj = {
            name: assenteFormValue.name,
            surname: assenteFormValue.surname,
            email: assenteFormValue.email,
            phone: assenteFormValue.phone,
            role: assenteFormValue.role
        };
        this.assentiService.newSuspectCase(obj).subscribe((res: any) => {
            console.log(res);
        });
    }
}
