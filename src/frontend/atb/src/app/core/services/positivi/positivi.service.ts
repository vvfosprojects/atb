import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import {
    DtoNewPositiveCaseInterface, DtoNewPositiveUpdateInterface,
    NewPositiveResponseInterface, NewPositiveUpdateResponseInterface,
    PositiveCaseInterface
} from '../../../shared/interface';

const APIURL = environment.baseUrl;

@Injectable()
export class PositiviService {

    constructor(private http: HttpClient) {
    }

    /**
     * return a positive
     * @param {any} obj
     * @returns {Observable<PositiveCaseInterface>}
     */
    getPositive({...obj}): Observable<PositiveCaseInterface> {
        const groupQuery = obj.group ? `&group=${obj.group}` : '';
        return this.http.get<PositiveCaseInterface>(APIURL + '/PatientSheet?caseNumber=' + obj.caseNumber + groupQuery);
    }

    /**
     * insert a new positive's subject
     * @param {DtoNewPositiveCaseInterface} obj
     * @returns {Observable<NewPositiveResponseInterface>}
     */
    newPositiveCase(obj: DtoNewPositiveCaseInterface): Observable<NewPositiveResponseInterface> {
        return this.http.post<NewPositiveResponseInterface>(APIURL + '/NewPositiveCase', obj);
    }

    /**
     * update subject of an existing positive
     * @param {DtoNewPositiveCaseInterface} obj
     * @returns {Observable<HttpResponseBase>}
     */
    updatePositiveCase(obj: DtoNewPositiveCaseInterface): Observable<HttpResponseBase> {
        return this.http.post<HttpResponseBase>(APIURL + '/UpdatePositive', obj);
    }

    /**
     * insert or update positive's data
     * @param {DtoNewPositiveUpdateInterface} obj
     * @returns {Observable<HttpResponseBase>}
     */
    newPositiveUpdate(obj: DtoNewPositiveUpdateInterface): Observable<NewPositiveUpdateResponseInterface> {
        return this.http.post<NewPositiveUpdateResponseInterface>(APIURL + '/NewPositiveUpdate', obj);
    }
}
