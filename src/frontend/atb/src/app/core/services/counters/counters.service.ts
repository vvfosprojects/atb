import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CountersResponseInterface } from '../../../shared/interface/common/counters-response.interface';

const APIURL = environment.baseUrl;
const APICOUNTERS = environment.apiUrl.sheetCounters;

@Injectable()
export class CountersService {

    constructor(private http: HttpClient) {
    }

    getCounters(): Observable<CountersResponseInterface> {
        return this.http.get<CountersResponseInterface>(APIURL + APICOUNTERS);
    }
}