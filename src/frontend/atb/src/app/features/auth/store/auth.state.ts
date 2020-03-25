import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LSNAME } from '../../../core/settings/config';
import {
    ClearAuth, RecoveryUrl, SetCurrentJwt,
    SetCurrentUser, SetLogged, SetReturnUrl
} from './auth.actions';
import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { UserInterface } from '../../../shared/interface/common';

export interface AuthStateModel {
    currentJwt: string;
    // currentTicket: string;
    currentUser: UserInterface;
    logged: boolean;
    returnUrl: string;
}

export const AuthStateDefaults: AuthStateModel = {
    currentJwt: null,
    // currentTicket: null,
    currentUser: null,
    logged: false,
    returnUrl: '/'
};

@Injectable()
@State<AuthStateModel>({
    name: 'auth',
    defaults: AuthStateDefaults
})
export class AuthState {

    constructor() {
    }

    @Selector()
    static currentJwt(state: AuthStateModel) {
        return state.currentJwt;
    }

    @Selector()
    static currentUser(state: AuthStateModel) {
        return state.currentUser;
    }

    @Selector()
    static logged(state: AuthStateModel) {
        return state.logged;
    }

    @Action(SetCurrentJwt)
    setCurrentJwt({ patchState, dispatch }: StateContext<AuthStateModel>, action: SetCurrentJwt) {
        if (action.currentJwt) {
            sessionStorage.setItem(LSNAME.token, JSON.stringify(action.currentJwt));
            const currentUrl = JSON.parse(localStorage.getItem(LSNAME.redirectUrl));
            patchState({
                currentJwt: action.currentJwt,
                // currentTicket: null
            });
            dispatch([
                new SetLogged(),
                currentUrl && new RecoveryUrl
            ])
        }
    }

    @Action(SetCurrentUser)
    setCurrentUser({ patchState }: StateContext<AuthStateModel>, { currentUser }: SetCurrentUser) {
        sessionStorage.setItem(LSNAME.currentUser, JSON.stringify(currentUser));
        patchState({ currentUser });
    }

    @Action(SetLogged)
    setLogged({ patchState }: StateContext<AuthStateModel>) {
        patchState({ logged: true });
    }

    @Action(SetReturnUrl)
    setReturnUrl({ patchState }: StateContext<AuthStateModel>, { returnUrl }: SetReturnUrl) {
        if (returnUrl) {
            localStorage.setItem(LSNAME.redirectUrl, JSON.stringify(returnUrl));
            patchState({ returnUrl });
        }
    }

    @Action(RecoveryUrl)
    recoveryUrl({ getState, dispatch, patchState }: StateContext<AuthStateModel>) {
        localStorage.removeItem(LSNAME.redirectUrl);
        dispatch(new Navigate([ getState().returnUrl ]));
        patchState({returnUrl: AuthStateDefaults.returnUrl})
    }

    @Action(ClearAuth)
    clearAuth({ patchState }: StateContext<AuthStateModel>) {
        sessionStorage.removeItem(LSNAME.token);
        sessionStorage.removeItem(LSNAME.currentUser);
        localStorage.removeItem(LSNAME.redirectUrl);
        patchState(AuthStateDefaults);
        window.location.href = '/';
    }

}
