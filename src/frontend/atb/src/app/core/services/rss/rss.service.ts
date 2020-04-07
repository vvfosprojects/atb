import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RssResponseInterface } from '../../../shared/interface';
import { environment } from '../../../../environments/environment';

const APIURL = environment.baseUrl;
const APIRSS = environment.apiUrl.rss;

@Injectable({
    providedIn: 'root'
})
export class RssService {

    constructor(private http: HttpClient) {
    }

    getRssData(): Observable<RssResponseInterface> {
        return this.http.get<RssResponseInterface>(APIURL + APIRSS);
    }

}
