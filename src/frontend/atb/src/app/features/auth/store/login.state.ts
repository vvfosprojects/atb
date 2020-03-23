import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ClearLogin, Login, Logout, SetErrorMessage } from './login.actions';
import { AuthenticationService } from '../../../core/services/auth';
import { ClearAuth, SetCurrentJwt, SetCurrentUser } from './auth.actions';
import { ngxsValidForm } from '../../../shared/functions';
import { Injectable } from '@angular/core';
import { AuthResponseInterface } from '../../../shared/interface/common';

export interface LoginStateModel {
    errorMessage: string;
    loginForm: any;
    submittedForm: boolean;
}

export const LoginStateDefaults: LoginStateModel = {
    errorMessage: null,
    loginForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
    },
    submittedForm: false
};

@Injectable()
@State<LoginStateModel>({
    name: 'login',
    defaults: LoginStateDefaults
})
export class LoginState {

    constructor(private authenticationService: AuthenticationService) {
    }

    @Selector()
    static errorMessage(state: LoginStateModel) {
        return state.errorMessage;
    }

    @Selector()
    static submittedForm(state: LoginStateModel) {
        return state.submittedForm;
    }

    @Action(SetErrorMessage)
    setErrorMessage({ patchState }: StateContext<LoginStateModel>, action: SetErrorMessage) {
        if (action.errorMessage) {
            patchState({
                errorMessage: action.errorMessage
            });
        }
    }

    @Action(Login)
    login({ getState, patchState, dispatch }: StateContext<LoginStateModel>) {
        const state = getState();
        patchState({ submittedForm: true });
        if (ngxsValidForm(state.loginForm.status)) {
            this.authenticationService.login(state.loginForm.model.username, state.loginForm.model.password).subscribe((response: AuthResponseInterface) => {
                if (response && response.success) {
                    dispatch([
                        new SetCurrentJwt(response.jwt),
                        new SetCurrentUser({
                            username: response.username,
                            roles: response.roles,
                            group: response.group
                        }),
                        new SetErrorMessage(null)
                    ]);
                } else if (!response.success) {
                    dispatch(new SetErrorMessage(response.errorMsg));
                }
            });
        }
    }

    @Action(Logout)
    logout({ dispatch }: StateContext<LoginStateModel>) {
        dispatch([
            new ClearLogin(),
            new ClearAuth()
        ]);
    }

    @Action(ClearLogin)
    clearLogin({ patchState }: StateContext<LoginStateModel>) {
        patchState(LoginStateDefaults);
    }

}
