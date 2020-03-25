import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PositiveCaseInterface } from '../../../../shared/interface/positive-case.interface';
import { SearchPositiveCase, SearchSuspectCase } from './search.actions';
import { SuspectCaseInterface } from '../../../../shared/interface/suspect-case.interface';
import { Navigate } from '@ngxs/router-plugin';
import { AssentiService } from '../../../../core/services/assenti/assenti.service';
import { PositiviService } from '../../../../core/services/positivi/positivi.service';

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

    constructor(private assentiService: AssentiService,
                private positiviService: PositiviService) {
    }

    @Action(SearchPositiveCase)
    searchPositiveCase({ patchState, dispatch }: StateContext<SearchStateModel>, action: SearchPositiveCase) {
        this.positiviService.getPositive(action.caseNumber).subscribe((positive: PositiveCaseInterface) => {
            patchState({
                positiveCase: positive
            });
            dispatch(new Navigate(['./home/form-positivo/' + positive.subject.number]));
        });
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
