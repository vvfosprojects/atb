import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SaveNewPositivoCase, SetPageTitleFormPositivo } from './form-positivo.actions';
import { Injectable } from '@angular/core';

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
            quarantinePlace: string;
            intensiveTerapy: boolean;
            expectedWorkReturnDate: string;
            actualWorkReturnDate: null;
            closedCase: boolean;
        };
        status?: string;
    };
}

export const formPositivoStateDefaults: FormPositivoStateModel = {
    pageTitle: 'nuovo positivo',
    positivoForm: {
        model: undefined
    }
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

    @Action(SetPageTitleFormPositivo)
    setPageTitleFormPositivo({ patchState }: StateContext<FormPositivoStateModel>, action: SetPageTitleFormPositivo) {
        patchState({
            pageTitle: action.title
        });
    }

    @Action(SaveNewPositivoCase)
    saveNewPositivoCase({ getState }: StateContext<FormPositivoStateModel>) {
        const state = getState();
        console.log('SaveNewPositivoCase',
            state.positivoForm.model
        );
        // todo: logica per il save
    }
}
