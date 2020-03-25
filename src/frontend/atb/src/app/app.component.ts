import { Component, OnDestroy } from '@angular/core';
import { LSNAME } from './core/settings/config';
import { SetCurrentJwt, SetCurrentUser } from './features/auth/store/auth.actions';
import { debounceTime, delay } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { LoadingState } from './shared/store/loading/loading.state';
import { Observable, Subscription } from 'rxjs';
import { AuthState } from './features/auth/store/auth.state';
import { UserInterface } from './shared/interface/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    @Select(AuthState.currentUser) currentUser$: Observable<UserInterface>;

    loading = false;
    currentUser: UserInterface;

    private subscription = new Subscription();

    constructor(private store: Store) {
        this.subscription.add(this.currentUser$.pipe(delay(100))
            .subscribe(r => this.currentUser = r));
        this.subscription.add(this.loading$.pipe(delay(0), debounceTime(100))
            .subscribe(r => this.loading = r));
        this.getSessionData();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getSessionData() {
        const sessionToken = JSON.parse(sessionStorage.getItem(LSNAME.token));
        const sessionCurrentUser = JSON.parse(sessionStorage.getItem(LSNAME.currentUser));
        sessionToken && this.store.dispatch(new SetCurrentJwt(sessionToken));
        sessionCurrentUser && this.store.dispatch(new SetCurrentUser(sessionCurrentUser));
    }
}
