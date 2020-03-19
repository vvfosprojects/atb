import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const APIURL = environment.baseUrl;

@Injectable()
export class AssentiService {

    constructor(private http: HttpClient) {
    }

    newSuspectCase(obj: any): Observable<any> {
        return this.http.post(APIURL + '/NewSuspect', obj);
    }
}
