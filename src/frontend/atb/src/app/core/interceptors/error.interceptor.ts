import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { ErrorResponseInterface } from '../../shared/interface/common';
// import { Unauthorized } from '../../features/auth/store/login.actions';
// import { SetWrongError } from '../../features/wrong/store/wrong.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private store: Store) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<ErrorResponseInterface>> {
        return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
            if ([ 401, 302 ].indexOf(err.status) !== -1) {
                // Todo error 401,302 Unauthorized
                // this.store.dispatch(new Unauthorized());
            }
            if ([ 403 ].indexOf(err.status) !== -1) {
                this.store.dispatch(new Navigate(['/forbidden']));
            }
            const response: ErrorResponseInterface = {
                message: err.error.message,
                status: err.status
            };
            // this.store.dispatch(new SetWrongError(response.message));
            return throwError(response);
        }));
    }
}
