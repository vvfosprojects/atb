import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CountersInterface, PositiveCaseInterface, SuspectCaseInterface } from '../../../shared/interface';
import {
    ClearPositiveCase,
    ClearSuspectCase, GetSheetCounters, OpenKeepAliveModal,
    SearchPositiveCase,
    SearchSuspectCase, SetKeepAliveConfirm,
    SetNotFound
} from './search.actions';
import { Navigate } from '@ngxs/router-plugin';
import { AssentiService } from '../../../core/services/assenti/assenti.service';
import { PositiviService } from '../../../core/services/positivi/positivi.service';
import { CountersService } from '../../../core/services/counters/counters.service';
import { LSNAME } from '../../../core/settings/config';
import { AuthState } from '../../auth/store/auth.state';
import { KeepAliveService } from '../../../core/services/keep-alive/keep-alive.service';
import { detailArgs } from '../../../shared/functions/functions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

export interface SearchStateModel {
    positiveCase: PositiveCaseInterface;
    suspectCase: SuspectCaseInterface;
    sheetCounters: CountersInterface;
    isLooking: boolean;
    notFound: boolean;
    keepAliveConfirm: string;
}

export const searchStateDefaults: SearchStateModel = {
    positiveCase: null,
    suspectCase: null,
    sheetCounters: null,
    isLooking: false,
    notFound: false,
    keepAliveConfirm: null
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
                private keepAliveService: KeepAliveService,
                private modalService: NgbModal,
                private store: Store) {
    }

    @Action(SearchPositiveCase)
    searchPositiveCase({ patchState, dispatch }: StateContext<SearchStateModel>, action: SearchPositiveCase) {
        console.log('searchPositiveCase', action.caseNumber, action.bookmark);
        patchState({ notFound: false, isLooking: true });
        this.positiviService.getPositive(detailArgs(action, this.getUserGroup(action))).subscribe((positive: PositiveCaseInterface) => {
            patchState({
                positiveCase: positive,
                isLooking: false
            });
            const detail = positive.data.link && positive.data.link.closed ? 'detail/' : '';
            !action.bookmark && dispatch(new Navigate([ './home/form-positivo/' + `${detail}${this.getAuthGroup()}${LSNAME.detailDelimiter}${positive.subject.number}` ]));
        }, () => dispatch(new SetNotFound()));
    }

    @Action(ClearPositiveCase)
    clearPositiveCase({ patchState }: StateContext<SearchStateModel>) {
        patchState({ positiveCase: searchStateDefaults.positiveCase, notFound: searchStateDefaults.notFound });
    }

    @Action(SearchSuspectCase)
    searchSuspectCase({ patchState, dispatch }: StateContext<SearchStateModel>, action: SearchSuspectCase) {
        console.log('searchSuspectCase', action.caseNumber, action.bookmark);
        patchState({ notFound: false, isLooking: true });
        this.assentiService.getSuspect(detailArgs(action, this.getUserGroup(action))).subscribe((suspect: SuspectCaseInterface) => {
            patchState({
                suspectCase: suspect,
                isLooking: false
            });
            const detail = suspect.data.link && suspect.data.link.closed ? 'detail/' : '';
            !action.bookmark && dispatch(new Navigate([ './home/form-assente/' + `${detail}${this.getAuthGroup()}${LSNAME.detailDelimiter}${suspect.subject.number}` ]));
        }, () => dispatch(new SetNotFound()));
    }

    @Action(ClearSuspectCase)
    clearSuspectCase({ patchState }: StateContext<SearchStateModel>) {
        patchState({ suspectCase: searchStateDefaults.suspectCase, notFound: searchStateDefaults.notFound });
    }

    @Action(GetSheetCounters)
    getSheetCounters({ patchState }: StateContext<SearchStateModel>) {
        const userGroup = this.store.selectSnapshot(AuthState.currentUser).group;
        this.countersService.getCounters(userGroup).subscribe(res => {
            if (res) {
                patchState({ sheetCounters: res.counters })
            }
        });
    }

    @Action(SetNotFound)
    setNotFound({ patchState }: StateContext<SearchStateModel>) {
        patchState({ notFound: true, isLooking: false });
    }

    @Action(OpenKeepAliveModal)
    openKeepAliveModal({ dispatch }: StateContext<SearchStateModel>) {
        const keepAliveConfirmModal = this.modalService.open(ConfirmModalComponent, {
            centered: true, size: 'md', backdropClass: 'backdrop-custom-black'
        });

        keepAliveConfirmModal.componentInstance.title = 'Assenza casi';
        keepAliveConfirmModal.componentInstance.message = 'Sei sicuro di non avere ulteriori aggiornamenti?';

        keepAliveConfirmModal.result.then((result: string) => {
            if (result && result === 'confirm') {
                this.keepAliveService.sendKeepAlive().subscribe( (response) => {
                    if (response && response.msg) {
                        dispatch(new SetKeepAliveConfirm(response.msg));
                    }
                });
            }
        }, () => console.log('keepAliveConfirmModal closed'));
    }

    @Action(SetKeepAliveConfirm)
    setKeepAliveConfirm({ patchState }: StateContext<SearchStateModel>, { keepAliveConfirm }: SetKeepAliveConfirm) {
        patchState({ keepAliveConfirm });
    }

    getUserGroup(action): string {
        let userGroup: string;
        if (!action.bookmark) {
            userGroup = this.getAuthGroup();
            console.log(userGroup);
        }
        return userGroup;
    }

    getAuthGroup(): string {
        return this.store.selectSnapshot(AuthState.currentUser).group;
    }

}
