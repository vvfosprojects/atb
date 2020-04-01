import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DtoNewPositiveCaseInterface } from '../../../shared/interface/dto-new-positive-case.interface';
import { DtoNewPositiveUpdateInterface } from '../../../shared/interface/dto-new-positive-update.interface';

const APIURL = environment.baseUrl;

@Injectable()
export class PositiviService {

    constructor(private http: HttpClient) {
    }

    getPositive(caseNumber: number) {
        return this.http.get(APIURL + '/PatientSheet?caseNumber=' + caseNumber);
    }

    newPositiveCase(obj: DtoNewPositiveCaseInterface): Observable<any> {
        return this.http.post(APIURL + '/NewPositiveCase', obj);
    }

    updatePositiveCase(obj: DtoNewPositiveCaseInterface): Observable<any> {
        return this.http.post(APIURL + '/UpdatePositive', obj);
    }

    newPositiveUpdate(obj: DtoNewPositiveUpdateInterface): Observable<any> {
        return this.http.post(APIURL + '/NewPositiveUpdate', obj);
    }
}
