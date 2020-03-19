import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LSNAME } from '../../../core/settings/config';
import {
    ClearAuth, GetAuth,
    SetCurrentJwt,
    SetCurrentTicket,
    SetCurrentUser, SetLogged, SetReturnUrl
} from './auth.actions';
import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { UserInterface } from '../../../shared/interface/common/user.interface';


export interface AuthStateModel {
    currentJwt: string;
    currentTicket: string;
    currentUser: UserInterface;
    logged: boolean;
    returnUrl: string;
}

export const AuthStateDefaults: AuthStateModel = {
    currentJwt: null,
    currentTicket: null,
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

    @Action(SetCurrentTicket)
    setCurrentTicket({ patchState, dispatch }: StateContext<AuthStateModel>, action: SetCurrentTicket) {
        if (action.currentTicket) {
            patchState({
                currentTicket: action.currentTicket
            });
            dispatch(new GetAuth());
        }
    }

    @Action(SetCurrentJwt)
    setCurrentJwt({ patchState, dispatch }: StateContext<AuthStateModel>, action: SetCurrentJwt) {
        if (action.currentJwt) {
            sessionStorage.setItem(LSNAME.token, JSON.stringify(action.currentJwt));
            const currentUrl = JSON.parse(localStorage.getItem(LSNAME.redirectUrl));
            patchState({
                currentJwt: action.currentJwt,
                currentTicket: null
            });
            dispatch([ new SetLogged(), currentUrl && new Navigate([ currentUrl ]) ])
        }
    }

    @Action(SetCurrentUser)
    setCurrentUser({ patchState }: StateContext<AuthStateModel>, { currentUser }: SetCurrentUser) {
        sessionStorage.setItem(LSNAME.currentUser, JSON.stringify(currentUser.username));
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

    @Action(ClearAuth)
    clearAuth({ patchState }: StateContext<AuthStateModel>) {
        sessionStorage.removeItem(LSNAME.token);
        sessionStorage.removeItem(LSNAME.currentUser);
        localStorage.removeItem(LSNAME.redirectUrl);
        patchState(AuthStateDefaults);
        window.location.href = '/';
    }

}
