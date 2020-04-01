import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DtoNewSuspectCaseInterface } from '../../../shared/interface/dto-new-suspect-case.interface';
import { DtoNewSuspectUpdateInterface } from '../../../shared/interface/dto-new-suspect-update.interface';

const APIURL = environment.baseUrl;

@Injectable()
export class AssentiService {

    constructor(private http: HttpClient) {
    }

    getSuspect(caseNumber: number, group?: string) {
        const groupQuery = group ? `&group=${group}`: '';
        return this.http.get(APIURL + '/SuspectSheet?caseNumber=' + caseNumber + groupQuery);
    }

    newSuspectCase(obj: DtoNewSuspectCaseInterface): Observable<any> {
        return this.http.post(APIURL + '/NewSuspect', obj);
    }

    updateSuspectCase(obj: DtoNewSuspectCaseInterface): Observable<any> {
        return this.http.post(APIURL + '/UpdateSuspect', obj);
    }

    newSuspectUpdate(obj: DtoNewSuspectUpdateInterface): Observable<any> {
        return this.http.post(APIURL + '/NewSuspectUpdate', obj);
    }
}
