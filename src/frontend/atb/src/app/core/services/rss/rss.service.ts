import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RssResponseInterface } from '../../../shared/interface/common/rss-response.interface';

@Injectable({
    providedIn: 'root'
})
export class RssService {

    constructor(private http: HttpClient) {
    }

    getRssData(): Observable<RssResponseInterface> {
        return this.http.get<RssResponseInterface>('/assets/rss/feeds.json');
    }

}
