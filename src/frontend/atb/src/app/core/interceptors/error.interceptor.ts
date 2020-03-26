import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { ErrorResponseInterface } from '../../shared/interface/common';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private store: Store, private toastrService: ToastrService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<ErrorResponseInterface>> {
        return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
            const errorMsg = err.error && err.error.error ? err.error.error : `Errore applicativo. Si prega di riprovare più tardi. Se l'errore persiste si prega di segnalare a assistenza.atb@vigilfuoco.it`;
            if ([ 403 ].indexOf(err.status) !== -1) {
                this.store.dispatch(new Navigate([ '/forbidden' ]));
            } else {
                this.toastrService.error(`${errorMsg}`, 'Errore');
            }
            const response: ErrorResponseInterface = {
                error: errorMsg,
            };
            return throwError(response);
        }));
    }
}
