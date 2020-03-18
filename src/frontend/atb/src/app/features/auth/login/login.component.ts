import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginState } from '../store/login.state';
import { ClearLogin, Login } from '../store/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;
    submitted: boolean;

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    @Select(LoginState.errorMessage) errorMessage$: Observable<string>;
    @Select(LoginState.submittedForm) submittedForm$: Observable<boolean>;

    private subscription = new Subscription();

    constructor(private store: Store, private formBuilder: FormBuilder) {
        this.subscription.add(this.submittedForm$.subscribe(r => this.submitted = r));
    }

    get f() {
        return this.loginForm.controls;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [ '', Validators.required ],
            password: [ '', Validators.required ]
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.store.dispatch(new ClearLogin());
    }

    onSubmit() {
        this.store.dispatch(new Login());
    }

}
