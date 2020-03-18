import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LSNAME } from '../../../core/settings/config';
import {
    ClearAuth, GetAuth,
    SetCurrentJwt,
    SetCurrentTicket,
    SetCurrentUser
} from './auth.actions';
import { Injectable } from '@angular/core';


export interface AuthStateModel {
    currentJwt: string;
    currentTicket: string;
    currentUser: string;
}

export const AuthStateDefaults: AuthStateModel = {
    currentJwt: null,
    currentTicket: null,
    currentUser: null
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
            // const currentUrl = JSON.parse(localStorage.getItem(LSNAME.redirectUrl));
            patchState({
                currentJwt: action.currentJwt,
                currentTicket: null
            });
            // dispatch([ new SetReturnUrl(currentUrl), new SetLogged() ])
        }
    }

    @Action(SetCurrentUser)
    setCurrentUser({ patchState }: StateContext<AuthStateModel>, { currentUser }: SetCurrentUser) {
        sessionStorage.setItem(LSNAME.currentUser, JSON.stringify(currentUser));
        patchState({ currentUser });
    }

    @Action(ClearAuth)
    clearAuth({ patchState }: StateContext<AuthStateModel>) {
        patchState(AuthStateDefaults);
    }

}
