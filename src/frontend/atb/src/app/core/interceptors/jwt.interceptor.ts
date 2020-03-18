import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../../features/auth/store/auth.state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private store: Store) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenJwt = this.store.selectSnapshot(AuthState.currentJwt);
        if (tokenJwt) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokenJwt}`,
                    Accept: `application/json`
                }
            });
        }

        return next.handle(request);
    }
}
