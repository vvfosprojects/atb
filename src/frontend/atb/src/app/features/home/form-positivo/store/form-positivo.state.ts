import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetPageTitleFormPositivo } from './form-positivo.actions';
import { Injectable } from '@angular/core';

export interface FormPositivoStateModel {
    pageTitle: string;
    positivoForm: {
        model?: {
            // Personal Information
            // todo: verificare se necessario (number)
            // number: number;
            name: string;
            surname: string;
            email: string;
            phone: string;
            role: string;
            // Personal Data
            caseNumber: number;
            estremiProvvedimentiASL: string;
            quarantinePlace: string;
            expectedWorkReturnDate: string;
            actualWorkReturnDate: null;
            closedCase: boolean;
        };
    };
}

export const formPositivoStateDefaults: FormPositivoStateModel = {
    pageTitle: 'nuova scheda',
    positivoForm: {
        model: undefined
    }
};

@Injectable()
@State<FormPositivoStateModel>({
    name: 'formPositivo',
    defaults: formPositivoStateDefaults
})
export class FormPositivoState {

    @Selector()
    static pageTitle(state: FormPositivoStateModel) {
        return state.pageTitle;
    }

    @Action(SetPageTitleFormPositivo)
    setPageTitleFormPositivo({ patchState }: StateContext<FormPositivoStateModel>, action: SetPageTitleFormPositivo) {
        patchState({
            pageTitle: action.title
        });
    }
}
