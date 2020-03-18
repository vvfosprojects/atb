import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetPageTitleFormPositivo } from './form-positivo.actions';

export interface FormPositivoStateModel {
    pageTitle: string;
    positivoForm: {
        model?: {
            personalInformation: {
                number: number;
                name: string;
                surname: string;
                email: string;
                phone: string;
                role: string;
            };
            personalData: {
                caseNumber: number;
                estremiProvvedimentiASL: string;
                quarantinePlace: string;
                expectedWorkReturnDate: string;
                actualWorkReturnDate: null;
                closedCase: boolean;
            };
        };
    };
}

export const formPositivoStateDefaults: FormPositivoStateModel = {
    pageTitle: 'Crea Scheda: Nuovo Positivo',
    positivoForm: {
        model: undefined
    }
};

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