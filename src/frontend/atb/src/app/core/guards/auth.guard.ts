import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { AuthState } from '../../features/auth/store/auth.state';
import { SetReturnUrl } from '../../features/auth/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private store: Store) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('data', route.data);
        const logged = this.store.selectSnapshot(AuthState.logged);
        if (logged) {
            return true;
        }
        console.log('Not logged user', state.url);
        this.store.dispatch([
            new Navigate([ '/login' ]),
            new SetReturnUrl(state.url)
        ]);
        return false;
    }
}
