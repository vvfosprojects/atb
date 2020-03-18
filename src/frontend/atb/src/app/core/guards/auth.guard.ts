import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
// import { SetReturnUrl } from '../../features/auth/store/login.actions';
// import { LoginState } from '../../features/auth/store/login.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private store: Store) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const logged = this.store.selectSnapshot(LoginState.logged);
        const logged = true;
        if (logged) {
            return true;
        }
        console.log('Not logged user', state.url);
        this.store.dispatch([
            // new Navigate([ '/login' ]),
            // new SetReturnUrl(state.url)
        ]);
        return false;
    }
}
