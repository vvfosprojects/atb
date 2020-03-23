import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../store/auth.state';
import { Observable, Subscription } from 'rxjs';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { Location } from '@angular/common';
import { ChangePassword, ClearReset } from '../store/reset.actions';
import { ResetState } from '../store/reset.state';
import { Navigate } from '@ngxs/router-plugin';
import { mustMatch } from '../../../shared/functions';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: [ './reset-password.component.scss' ]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

    resetForm: FormGroup;
    submitted: boolean;

    @Select(AuthState.logged) logged$: Observable<boolean>;
    @Select(LoadingState.loading) loading$: Observable<boolean>;
    @Select(ResetState.submittedForm) submittedForm$: Observable<boolean>;
    @Select(ResetState.successChange) successChange$: Observable<boolean>;

    private subscription = new Subscription();

    constructor(private _location: Location, private store: Store, private formBuilder: FormBuilder) {
        this.subscription.add(this.logged$.subscribe(r => this.onBack(r)));
        this.subscription.add(this.submittedForm$.subscribe(r => this.submitted = r));
    }

    get f() {
        return this.resetForm.controls;
    }

    ngOnInit() {
        this.resetForm = this.formBuilder.group({
            oldPassword: [ '', Validators.required ],
            newPassword: [ '', Validators.required ],
            newPasswordConfirm: [ '', Validators.required ]
        }, {
            validator: [ mustMatch('newPassword', 'newPasswordConfirm') ]
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.store.dispatch(new ClearReset());
    }

    onBack(logged: boolean) {
        if (!logged) {
            console.log('only logged user can access this page');
            this._location.back();
        }
    }

    onHome() {
        this.store.dispatch(new Navigate([ '/' ]));
    }

    onSubmit() {
        this.store.dispatch(new ChangePassword());
    }

}
