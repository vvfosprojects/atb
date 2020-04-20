import { Action, NgxsOnInit, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Roles } from '../../../shared/enum/roles.enum';
import { GoToPositiveSheet, GoToSuspectSheet, SetUserGroup, SetUserRoles } from './navigation-link.actions';
import { AuthState } from '../../auth/store/auth.state';
import { Navigate } from '@ngxs/router-plugin';

export interface NavigationLinkStateModel {
    userRoles: Roles[];
    userGroup: string;
}

export const NavigationLinkStateDefaults: NavigationLinkStateModel = {
    userRoles: [],
    userGroup: null
};

@Injectable()
@State<NavigationLinkStateModel>({
    name: 'navigationLink',
    defaults: NavigationLinkStateDefaults
})
export class NavigationLinkState implements NgxsOnInit {

    ngxsOnInit(ctx?: StateContext<NavigationLinkStateModel>): void {
        const currentUser = this.store.selectSnapshot(AuthState.currentUser);
        ctx.dispatch([ new SetUserRoles(currentUser.roles), new SetUserGroup(currentUser.group) ]);
    }

    constructor(private store: Store) {
    }

    @Selector()
    static userRoles(state: NavigationLinkStateModel) {
        return state.userRoles;
    }

    @Action(SetUserRoles)
    setUserRoles({ patchState }: StateContext<NavigationLinkStateModel>, { userRoles }: SetUserRoles) {
        patchState({ userRoles });
    }

    @Action(SetUserGroup)
    setUserGroup({ patchState }: StateContext<NavigationLinkStateModel>, { userGroup }: SetUserGroup) {
        patchState({ userGroup });
    }

    @Action(GoToPositiveSheet)
    goToPositiveSheet({ getState, dispatch }: StateContext<NavigationLinkStateModel>, action: GoToPositiveSheet) {
        const positivePath = './home/form-positivo/';
        let detail = true;
        if (action.closed) {
            detail = !getState().userRoles.includes(Roles.Doctor);
        }
        const link = positivePath + this.createLink(action.url, detail);
        console.log(link);
        dispatch(new Navigate([ link ]));
    }

    @Action(GoToSuspectSheet)
    goToSuspectSheet({ getState, dispatch }: StateContext<NavigationLinkStateModel>, action: GoToSuspectSheet) {
        const suspectPath = './home/form-assente/';
        let detail = true;
        if (action.closed) {
            detail = !getState().userRoles.includes(Roles.Doctor);
        }
        const link = suspectPath + this.createLink(action.url, detail);
        console.log(link);
        dispatch(new Navigate([ link ]));
    }

    createLink(url: string, detail: boolean): string {
        return detail ? 'detail/' + url : url;
    }

}
