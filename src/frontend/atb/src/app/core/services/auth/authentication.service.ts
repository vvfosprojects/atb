import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const APIURL = environment.baseUrl;
const APILOGIN = environment.apiUrl.login;

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string) {
        return this.http.post<any>(APIURL + APILOGIN, { username, password });
    }

}
