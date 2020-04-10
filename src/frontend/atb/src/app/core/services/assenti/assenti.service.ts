import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import {
    DtoNewSuspectCaseInterface, DtoNewSuspectUpdateInterface,
    NewSuspectResponseInterface, NewSuspectUpdateResponseInterface,
    SuspectCaseInterface
} from '../../../shared/interface/';


const APIURL = environment.baseUrl;

@Injectable()
export class AssentiService {

    constructor(private http: HttpClient) {
    }

    /**
     * return a suspect
     * @param {any} obj
     * @returns {Observable<SuspectCaseInterface>}
     */
    getSuspect({ ...obj }): Observable<SuspectCaseInterface> {
        const groupQuery = obj.group ? `&group=${obj.group}` : '';
        return this.http.get<SuspectCaseInterface>(APIURL + '/SuspectSheet?caseNumber=' + obj.caseNumber + groupQuery);
    }

    /**
     * insert a new suspect's subject
     * @param {DtoNewSuspectCaseInterface} obj
     * @returns {Observable<NewSuspectResponseInterface>}
     */
    newSuspectCase(obj: DtoNewSuspectCaseInterface): Observable<NewSuspectResponseInterface> {
        return this.http.post<NewSuspectResponseInterface>(APIURL + '/NewSuspect', obj);
    }

    /**
     * update subject of an existing suspect
     * @param {DtoNewSuspectCaseInterface} obj
     * @returns {Observable<HttpResponseBase>}
     */
    updateSuspectCase(obj: DtoNewSuspectCaseInterface): Observable<HttpResponseBase> {
        return this.http.post<HttpResponseBase>(APIURL + '/UpdateSuspect', obj);
    }

    /**
     * insert or update suspect's data
     * @param {DtoNewSuspectUpdateInterface} obj
     * @returns {Observable<NewSuspectUpdateResponseInterface>}
     */
    newSuspectUpdate(obj: DtoNewSuspectUpdateInterface): Observable<NewSuspectUpdateResponseInterface> {
        return this.http.post<NewSuspectUpdateResponseInterface>(APIURL + '/NewSuspectUpdate', obj);
    }
}
