import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StatisticsResponseInterface } from '../../../shared/interface/common/statistics-response.interface';

const APIURL = environment.baseUrl;
const APISTATISTICS = environment.apiUrl.statistics;

@Injectable()
export class StatisticsService {

    constructor(private http: HttpClient) {
    }

    getStatisticsData(): Observable<StatisticsResponseInterface> {
        return this.http.get<StatisticsResponseInterface>(APIURL + APISTATISTICS);
    }
}
