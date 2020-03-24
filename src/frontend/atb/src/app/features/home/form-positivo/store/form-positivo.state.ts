import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SaveNewPositivoCase, SetPageTitleFormPositivo, UpdatePositivoCase } from './form-positivo.actions';
import { Injectable } from '@angular/core';
import { formatDate } from '../../../../shared/functions/functions';
import { Navigate } from '@ngxs/router-plugin';
import { PositiviService } from '../../../../core/services/positivi/positivi.service';

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
            actualWorkReturnDate: string;
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

    constructor(private positiviService: PositiviService) {
    }

    @Action(SetPageTitleFormPositivo)
    setPageTitleFormPositivo({ patchState }: StateContext<FormPositivoStateModel>, action: SetPageTitleFormPositivo) {
        patchState({
            pageTitle: action.title
        });
    }

    @Action(SaveNewPositivoCase)
    saveNewPositivoCase({ getState, dispatch }: StateContext<FormPositivoStateModel>) {
        const positivoFormValue = getState().positivoForm.model;
        const objSubject = {
            number: positivoFormValue.caseNumber,
            name: positivoFormValue.name,
            surname: positivoFormValue.surname,
            email: positivoFormValue.email,
            phone: positivoFormValue.phone.toString(),
            role: positivoFormValue.role
        };
        this.positiviService.newPositiveCase(objSubject).subscribe(() => {
            const objData = {
                caseNumber: positivoFormValue.caseNumber,
                estremiProvvedimentiASL: positivoFormValue.estremiProvvedimentiASL,
                quarantinePlace: positivoFormValue.intensiveTerapy && positivoFormValue.intensiveTerapy === true ? 'INTCARE' : positivoFormValue.quarantinePlace,
                expectedWorkReturnDate: positivoFormValue.expectedWorkReturnDate ? formatDate(positivoFormValue.expectedWorkReturnDate) : null,
                actualWorkReturnDate: positivoFormValue.actualWorkReturnDate ? formatDate(positivoFormValue.actualWorkReturnDate) : null
            };
            this.positiviService.newPositiveUpdate(objData).subscribe(() => {
                dispatch(new Navigate(['./home/ricerca']));
            });
        });
    }

    @Action(UpdatePositivoCase)
    updatePositivoCase({ getState, dispatch }: StateContext<FormPositivoStateModel>) {
        const positivoFormValue = getState().positivoForm.model;
        const objData = {
            caseNumber: positivoFormValue.caseNumber,
            estremiProvvedimentiASL: positivoFormValue.estremiProvvedimentiASL,
            quarantinePlace: positivoFormValue.intensiveTerapy && positivoFormValue.intensiveTerapy === true ? 'INTCARE' : positivoFormValue.quarantinePlace,
            expectedWorkReturnDate: formatDate(positivoFormValue.expectedWorkReturnDate),
            actualWorkReturnDate: positivoFormValue.actualWorkReturnDate ? formatDate(positivoFormValue.actualWorkReturnDate) : null
        };
        this.positiviService.newPositiveUpdate(objData).subscribe(() => {
            dispatch(new Navigate(['./home/ricerca']));
        });
    }
}
