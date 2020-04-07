import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import {
    DtoNewPositiveCaseInterface, DtoNewPositiveUpdateInterface,
    NewPositiveResponseInterface,
    PositiveCaseInterface
} from '../../../shared/interface';

const APIURL = environment.baseUrl;

@Injectable()
export class PositiviService {

    constructor(private http: HttpClient) {
    }

    getPositive({...obj}): Observable<PositiveCaseInterface> {
        const groupQuery = obj.group ? `&group=${obj.group}` : '';
        return this.http.get<PositiveCaseInterface>(APIURL + '/PatientSheet?caseNumber=' + obj.caseNumber + groupQuery);
    }

    newPositiveCase(obj: DtoNewPositiveCaseInterface): Observable<NewPositiveResponseInterface> {
        return this.http.post<NewPositiveResponseInterface>(APIURL + '/NewPositiveCase', obj);
    }

    updatePositiveCase(obj: DtoNewPositiveCaseInterface): Observable<HttpResponseBase> {
        return this.http.post<HttpResponseBase>(APIURL + '/UpdatePositive', obj);
    }

    newPositiveUpdate(obj: DtoNewPositiveUpdateInterface): Observable<HttpResponseBase> {
        return this.http.post<HttpResponseBase>(APIURL + '/NewPositiveUpdate', obj);
    }
}
