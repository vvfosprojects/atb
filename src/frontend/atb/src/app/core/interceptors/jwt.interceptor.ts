import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

// import { AuthState } from '../../features/auth/store/auth.state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private store: Store) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const tokenJwt = this.store.selectSnapshot(AuthState.currentJwt);
        // Todo getCurrentJwt
        const tokenJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmlvIFJvc3NpIiwiaWF0IjoxNTE2MjM5MDIyfQ.q8ztkIh93XjtN_Z2qd-wTAZ_1oXaGAhOZrwpIDSo1Ss';
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
