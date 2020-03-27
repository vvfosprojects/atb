import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetSheetCounters, SearchPositiveCase, SearchSuspectCase } from '../store/search.actions';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { Observable, Subscription } from 'rxjs';
import { RssState } from '../store/rss.state';
import { RssInterface } from '../../../shared/interface/rss.interface';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: [ './search.component.scss' ]
})
export class SearchComponent implements OnDestroy {

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    @Select(RssState.rssData) rssData$: Observable<RssInterface[]>;

    loading: boolean;

    private subscription = new Subscription();

    constructor(private store: Store) {
        this.subscription.add(
            this.loading$.subscribe((loading: boolean) => {
                this.loading = loading;
            })
        );
        this.store.dispatch(new GetSheetCounters());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSearchPositiveCase(search: number) {
        this.store.dispatch(new SearchPositiveCase(search));
    }

    onSearchSuspectCase(search: number) {
        this.store.dispatch(new SearchSuspectCase(search));
    }

}
