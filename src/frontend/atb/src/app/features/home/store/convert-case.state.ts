import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DtoNewCaseInterface, LinkCaseInterface } from '../../../shared/interface';
import { ClearConvertCase, SetConvertCase, SetLink, SetSubject } from './convert-case.actions';
import { Navigate } from '@ngxs/router-plugin';
import { SetPageTitleFormPositivo } from './form-positivo.actions';
import { SetPageTitleFormAssente } from './form-assente.actions';

export interface ConvertCaseStateModel {
    link: LinkCaseInterface;
    subject: DtoNewCaseInterface;
    convertCase: string;
}

export const ConvertCaseStateDefaults: ConvertCaseStateModel = {
    link: null,
    subject: null,
    convertCase: null
};

@Injectable()
@State<ConvertCaseStateModel>({
    name: 'convertCase',
    defaults: ConvertCaseStateDefaults
})
export class ConvertCaseState {

    @Selector()
    static subject(state: ConvertCaseStateModel) {
        return state.subject;
    }

    @Selector()
    static link(state: ConvertCaseStateModel) {
        return state.link;
    }

    @Action(SetLink)
    setLink({ patchState }: StateContext<ConvertCaseStateModel>, { link }: SetLink) {
        patchState({ link });
    }

    @Action(SetSubject)
    setSubject({ patchState, dispatch }: StateContext<ConvertCaseStateModel>, { subject }: SetSubject) {
        patchState({ subject });
    }

    @Action(SetConvertCase)
    setConvertCase({ patchState, dispatch }: StateContext<ConvertCaseStateModel>, { convertCase }: SetConvertCase) {
        patchState({ convertCase });
        const title = convertCase === 'form-positivo' ? 'nuovo positivo (ex sospetto)' : 'nuovo sorvegliato (ex positivo)';
        dispatch([
            convertCase === 'form-positivo' ? new SetPageTitleFormPositivo(title): new SetPageTitleFormAssente(title),
            new Navigate([ `./home/${convertCase}` ])
        ])
    }

    @Action(ClearConvertCase)
    clearConvertCase({ getState, patchState }: StateContext<ConvertCaseStateModel>, { convertCase }: ClearConvertCase) {
        const currentCase = getState().convertCase;
        if (currentCase === convertCase) {
            patchState(ConvertCaseStateDefaults);
        }
    }

}
