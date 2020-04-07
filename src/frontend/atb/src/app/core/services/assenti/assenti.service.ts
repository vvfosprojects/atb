import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { DtoNewSuspectCaseInterface } from '../../../shared/interface/suspect/dto-new-suspect-case.interface';
import { DtoNewSuspectUpdateInterface } from '../../../shared/interface/suspect/dto-new-suspect-update.interface';
import { NewSuspectResponseInterface } from '../../../shared/interface/suspect/new-suspect-response.interface';
import { SuspectCaseInterface } from '../../../shared/interface/suspect/suspect-case.interface';

const APIURL = environment.baseUrl;

@Injectable()
export class AssentiService {

    constructor(private http: HttpClient) {
    }

    getSuspect({...obj}): Observable<SuspectCaseInterface> {
        const groupQuery = obj.group ? `&group=${obj.group}`: '';
        return this.http.get<SuspectCaseInterface>(APIURL + '/SuspectSheet?caseNumber=' + obj.caseNumber + groupQuery);
    }

    newSuspectCase(obj: DtoNewSuspectCaseInterface): Observable<NewSuspectResponseInterface> {
        return this.http.post<NewSuspectResponseInterface>(APIURL + '/NewSuspect', obj);
    }

    updateSuspectCase(obj: DtoNewSuspectCaseInterface): Observable<HttpResponseBase> {
        return this.http.post<HttpResponseBase>(APIURL + '/UpdateSuspect', obj);
    }

    newSuspectUpdate(obj: DtoNewSuspectUpdateInterface): Observable<HttpResponseBase> {
        return this.http.post<HttpResponseBase>(APIURL + '/NewSuspectUpdate', obj);
    }
}
