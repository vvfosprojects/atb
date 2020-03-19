import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const APIURL = environment.baseUrl;

@Injectable()
export class PositiviService {

    constructor(private http: HttpClient) {
    }

    getPositive(caseNumber: number) {
        return this.http.get(APIURL + '/PositiveSheet?caseNumber=' + caseNumber);
    }

    newPositiveCase(obj: any): Observable<any> {
        return this.http.post(APIURL + '/NewPositiveCase', obj);
    }

    newPositiveUpdate(obj: any): Observable<any> {
        return this.http.post(APIURL + '/NewPositiveUpdate', obj);
    }
}
