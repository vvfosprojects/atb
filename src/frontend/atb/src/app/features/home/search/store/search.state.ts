import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PositiveCaseInterface } from '../../../../shared/interface/positive-case.interface';
import { SearchPositiveCase, SearchSuspectCase } from './search.actions';
import { SuspectCaseInterface } from '../../../../shared/interface/suspect-case.interface';
import { Navigate } from '@ngxs/router-plugin';
import { AssentiService } from '../../../../core/services/assenti/assenti.service';

export interface SearchStateModel {
    positiveCase: PositiveCaseInterface;
    suspectCase: SuspectCaseInterface;
}

export const searchStateDefaults: SearchStateModel = {
    positiveCase: null,
    suspectCase: null
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

    @Selector()
    static suspectCase(state: SearchStateModel) {
        return state.suspectCase;
    }

    constructor(private assentiService: AssentiService) {
    }

    @Action(SearchPositiveCase)
    setPageTitleFormPositivo({ patchState }: StateContext<SearchStateModel>, action: SearchPositiveCase) {
        // todo: da fare
        console.log('SearchPositiveCase', action.caseNumber);
    }

    @Action(SearchSuspectCase)
    searchSuspectCase({ patchState, dispatch }: StateContext<SearchStateModel>, action: SearchSuspectCase) {
        this.assentiService.getSuspect(action.caseNumber).subscribe((suspect: SuspectCaseInterface) => {
            patchState({
                suspectCase: suspect
            });
            dispatch(new Navigate(['./home/form-assente/' + suspect.subject.number]));
        });
    }
}
