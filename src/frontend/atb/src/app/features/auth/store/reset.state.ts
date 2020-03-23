import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { AuthenticationService } from '../../../core/services/auth';
import { HttpResponseBase } from '@angular/common/http';
import { ngxsValidForm } from '../../../shared/functions';
import { Injectable } from '@angular/core';
import { ChangePassword, ClearReset } from './reset.actions';
import { AuthState } from './auth.state';

export interface ResetStateModel {
    resetForm: any;
    successChange: boolean;
    submittedForm: boolean;
}

export const ResetStateDefaults: ResetStateModel = {
    resetForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
    },
    successChange: false,
    submittedForm: false
};

@Injectable()
@State<ResetStateModel>({
    name: 'reset',
    defaults: ResetStateDefaults
})
export class ResetState {

    constructor(private authenticationService: AuthenticationService, private store: Store) {
    }

    @Selector()
    static submittedForm(state: ResetStateModel) {
        return state.submittedForm;
    }

    @Selector()
    static successChange(state: ResetStateModel) {
        return state.successChange;
    }

    @Action(ChangePassword)
    changePassword({ getState, patchState }: StateContext<ResetStateModel>) {
        const state = getState();
        patchState({ submittedForm: true });
        if (ngxsValidForm(state.resetForm.status)) {
            const currentUser = this.store.selectSnapshot(AuthState.currentUser);
            this.authenticationService.changePassword(currentUser.username, state.resetForm.model.oldPassword, state.resetForm.model.newPassword)
                .subscribe((response: HttpResponseBase) => {
                    patchState({
                        successChange: true
                    });
                });
        }
    }

    @Action(ClearReset)
    clearLogin({ patchState }: StateContext<ResetStateModel>) {
        patchState(ResetStateDefaults);
    }

}
