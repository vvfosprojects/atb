import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { KeepAliveResponseInterface } from '../../../shared/interface';

const APIURL = environment.baseUrl;
const APIKEEPALIVE = environment.apiUrl.keepAlive;

@Injectable()
export class KeepAliveService {

    constructor(private http: HttpClient) {
    }

    sendKeepAlive(): Observable<KeepAliveResponseInterface> {
        return this.http.post<KeepAliveResponseInterface>(APIURL + APIKEEPALIVE, {});
    }


}
