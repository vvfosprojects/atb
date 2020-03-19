import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthResponseInterface } from '../../../shared/interface/common';
import { Observable } from 'rxjs';

const APIURL = environment.baseUrl;
const APILOGIN = environment.apiUrl.login;

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<AuthResponseInterface> {
        return this.http.post<AuthResponseInterface>(APIURL + APILOGIN, { username, password });
    }

}
