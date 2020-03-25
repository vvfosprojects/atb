import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GroupsResponseInterface, SheetsResponseInterface } from '../../../shared/interface/common';

const APIURL = environment.baseUrl;
const APIGROUPS = environment.apiUrl.groups;
const APISHEETS = environment.apiUrl.sheets;

@Injectable()
export class DataTablesService {

    constructor(private http: HttpClient) {
    }

    getGroups(): Observable<GroupsResponseInterface> {
        return this.http.get<GroupsResponseInterface>(APIURL + APIGROUPS);
    }

    getSheets(group: string): Observable<SheetsResponseInterface> {
        return this.http.post<SheetsResponseInterface>(APIURL + APISHEETS, { group });
    }

}
