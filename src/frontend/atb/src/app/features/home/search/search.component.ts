import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SearchPositiveCase, SearchSuspectCase } from './store/search.actions';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    constructor(private store: Store) {
    }

    ngOnInit(): void {
    }

    onSearchPositiveCase(search: number) {
        this.store.dispatch(new SearchPositiveCase(search));
    }

    onSearchSuspectCase(search: number) {
        this.store.dispatch(new SearchSuspectCase(search));
    }
}
