import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PositiveCaseInterface } from '../../../shared/interface/positive-case.interface';
import {
    ClearPositiveCase,
    ClearSuspectCase, GetSheetCounters,
    SearchPositiveCase,
    SearchSuspectCase,
    SetNotFound
} from './search.actions';
import { SuspectCaseInterface } from '../../../shared/interface/suspect-case.interface';
import { Navigate } from '@ngxs/router-plugin';
import { AssentiService } from '../../../core/services/assenti/assenti.service';
import { PositiviService } from '../../../core/services/positivi/positivi.service';
import { CountersInterface } from '../../../shared/interface/counters.interface';
import { CountersService } from '../../../core/services/counters/counters.service';
import { LSNAME } from '../../../core/settings/config';
import { AuthState } from '../../auth/store/auth.state';

export interface SearchStateModel {
    positiveCase: PositiveCaseInterface;
    suspectCase: SuspectCaseInterface;
    sheetCounters: CountersInterface;
    isLooking: boolean;
    notFound: boolean;
}

export const searchStateDefaults: SearchStateModel = {
    positiveCase: null,
    suspectCase: null,
    sheetCounters: null,
    isLooking: false,
    notFound: false
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

    @Selector()
    static counters(state: SearchStateModel) {
        return state.sheetCounters;
    }

    @Selector()
    static isLooking(state: SearchStateModel) {
        return state.isLooking;
    }

    @Selector()
    static notFound(state: SearchStateModel) {
        return state.notFound;
    }

    constructor(private assentiService: AssentiService,
                private positiviService: PositiviService,
                private countersService: CountersService,
                private store: Store) {
    }

    @Action(SearchPositiveCase)
    searchPositiveCase({ patchState, dispatch }: StateContext<SearchStateModel>, action: SearchPositiveCase) {
        patchState({ isLooking: true });
        this.positiviService.getPositive(detailArgs(action, this.getUserGroup(action))).subscribe((positive: PositiveCaseInterface) => {
            patchState({
                positiveCase: positive,
                isLooking: false
            });
            !action.bookmark && dispatch(new Navigate([ './home/form-positivo/' + positive.subject.number ]));
        }, () => dispatch(new SetNotFound()));
    }

    @Action(ClearPositiveCase)
    clearPositiveCase({ patchState }: StateContext<SearchStateModel>) {
        patchState({ positiveCase: searchStateDefaults.positiveCase, notFound: searchStateDefaults.notFound })
    }

    @Action(SearchSuspectCase)
    searchSuspectCase({ patchState, dispatch }: StateContext<SearchStateModel>, action: SearchSuspectCase) {
        patchState({ isLooking: true });

        this.assentiService.getSuspect(detailArgs(action, this.getUserGroup(action))).subscribe((suspect: SuspectCaseInterface) => {
            patchState({
                suspectCase: suspect,
                isLooking: false
            });
            !action.bookmark && dispatch(new Navigate([ './home/form-assente/' + suspect.subject.number ]));
        }, () => dispatch(new SetNotFound()));
    }

    @Action(ClearSuspectCase)
    clearSuspectCase({ patchState }: StateContext<SearchStateModel>) {
        patchState({ suspectCase: searchStateDefaults.suspectCase, notFound: searchStateDefaults.notFound })
    }

    @Action(GetSheetCounters)
    getSheetCounters({ patchState }: StateContext<SearchStateModel>) {
        this.countersService.getCounters().subscribe(res => {
            if (res) {
                patchState({ sheetCounters: res.counters })
            }
        });
    }

    @Action(SetNotFound)
    setNotFound({ patchState }: StateContext<SearchStateModel>) {
        patchState({ notFound: true, isLooking: false })
    }

    getUserGroup(action): string {
        let userGroup: string;
        if (!action.bookmark) {
            userGroup = this.store.selectSnapshot(AuthState.currentUser).group;
        }
        console.log(userGroup);
        return userGroup;
    }

}

export function detailArgs(action, userGroup) {
    let caseNumber: number;
    let group: string;
    if (action.bookmark) {
        const splittedArgs = action.caseNumber.split(LSNAME.detailDelimiter);
        group = splittedArgs[0];
        caseNumber = +splittedArgs[1];
    } else {
        caseNumber = +action.caseNumber;
        group = userGroup;
    }
    return { caseNumber, group }
}
