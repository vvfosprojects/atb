import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { AuthState } from '../auth/store/auth.state';
import { UserInterface } from '../../shared/interface/common';
import { Roles } from '../../shared/enum/roles.enum';
import { Navigate } from '@ngxs/router-plugin';
import { delay } from 'rxjs/operators';

@Component({ template: `` })
export class WelcomeComponent implements OnDestroy {

    @Select(AuthState.currentUser) currentUser$: Observable<UserInterface>;

    private subscription = new Subscription();

    constructor(private store: Store) {
        this.subscription.add(this.currentUser$.pipe(delay(100)).subscribe((r: UserInterface) => this.dispatchUser(r)));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    dispatchUser(user: UserInterface) {
        if (user) {
            console.log('dispatchUser');
            if (user.roles.length === 0) {
                this.store.dispatch(new Navigate([ '/forbidden' ]));
            }
            user.roles.includes(Roles.Manager) && this.store.dispatch(new Navigate([ '/reports' ]));
            user.roles.includes(Roles.Doctor) && this.store.dispatch(new Navigate([ '/home' ]));
            user.roles.includes(Roles.Supervisor) && this.store.dispatch(new Navigate([ '/home/data-tables' ]));

        }
    }
}
