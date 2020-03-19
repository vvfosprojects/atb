import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PositiveCaseInterface } from '../../../../shared/interface/positive-case.interface';
import { SearchPositiveCase, SearchSuspectCase } from './search.actions';

export interface SearchStateModel {
    positiveCase: PositiveCaseInterface;
}

export const searchStateDefaults: SearchStateModel = {
    positiveCase: null
};

@Injectable()
@State<SearchStateModel>({
    name: 'search',
    defaults: searchStateDefaults
})
export class SearchState {

    @Selector()
    static positiveCase(state: SearchStateModel) {
        return state.positiveCase;
    }

    @Action(SearchPositiveCase)
    setPageTitleFormPositivo({ patchState }: StateContext<SearchStateModel>, action: SearchPositiveCase) {
        // todo: da fare
        console.log('SearchPositiveCase', action.caseNumber);
    }

    @Action(SearchSuspectCase)
    searchSuspectCase({ patchState }: StateContext<SearchStateModel>, action: SearchSuspectCase) {
        // todo: da fare
        console.log('SearchSuspectCase', action.caseNumber);
    }
}
