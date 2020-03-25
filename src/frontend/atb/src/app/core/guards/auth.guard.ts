import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { AuthState } from '../../features/auth/store/auth.state';
import { SetReturnUrl } from '../../features/auth/store/auth.actions';
import { checkRoles } from '../../shared/functions';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private store: Store) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const logged = this.store.selectSnapshot(AuthState.logged);
        if (logged) {
            if (route.data && route.data.roles) {
                const user = this.store.selectSnapshot(AuthState.currentUser);
                console.log('User', user);
                if (user) {
                    const checkedRoles = checkRoles(route.data.roles, user);
                    if (!checkedRoles) {
                        console.log('Back to Url');
                        this.store.dispatch(new Navigate([ '/' ]));
                    }
                }
            }
            return true;
        }
        console.log('Not logged user', state.url);
        this.store.dispatch([
            new SetReturnUrl(state.url),
            new Navigate([ '/login' ])
        ]);
        return false;
    }
}
