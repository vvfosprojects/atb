import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SearchPositiveCase, SearchSuspectCase } from '../store/search.actions';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    loading: boolean;

    constructor(private store: Store) {
        this.getLoading();
    }

    ngOnInit(): void {
    }

    onSearchPositiveCase(search: number) {
        this.store.dispatch(new SearchPositiveCase(search));
    }

    onSearchSuspectCase(search: number) {
        this.store.dispatch(new SearchSuspectCase(search));
    }

    getLoading() {
        this.loading$.subscribe((loading: boolean) => {
            this.loading = loading;
        });
    }
}
