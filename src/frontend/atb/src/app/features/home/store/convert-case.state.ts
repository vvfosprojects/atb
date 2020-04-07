import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LinkCaseInterface } from '../../../shared/interface';
import { ClearConvertCase, SetLink } from './convert-case.actions';

export interface ConvertCaseStateModel {
    link: LinkCaseInterface;
}

export const ConvertCaseStateDefaults: ConvertCaseStateModel = {
    link: null
};

@Injectable()
@State<ConvertCaseStateModel>({
    name: 'convertCase',
    defaults: ConvertCaseStateDefaults
})
export class ConvertCaseState {

    @Selector()
    static link(state: ConvertCaseStateModel) {
        return state.link;
    }

    @Action(SetLink)
    setLink({ patchState }: StateContext<ConvertCaseStateModel>, { link }: SetLink) {
        patchState({ link });
    }

    @Action(ClearConvertCase)
    clearConvertCase({ patchState }: StateContext<ConvertCaseStateModel>) {
        patchState(ConvertCaseStateDefaults);
    }

}
