import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetSheetCounters, OpenKeepAliveModal, SearchPositiveCase, SearchSuspectCase } from '../store/search.actions';
import { Observable, Subscription } from 'rxjs';
import { RssState } from '../store/rss.state';
import { RssInterface } from '../../../shared/interface/rss.interface';
import { SearchState } from '../store/search.state';
import { CountersInterface } from '../../../shared/interface/counters.interface';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: [ './search.component.scss' ]
})
export class SearchComponent implements OnDestroy {

    @Select(SearchState.isLooking) isLooking$: Observable<boolean>;
    @Select(SearchState.counters) counters$: Observable<CountersInterface>;
    @Select(RssState.rssData) rssData$: Observable<RssInterface[]>;

    isLooking: boolean;
    counters: CountersInterface;

    private subscription = new Subscription();

    constructor(private store: Store) {
        this.subscription.add(
            this.isLooking$.subscribe(res => this.isLooking = res)
        );
        this.subscription.add(
            this.counters$.subscribe( res => this.counters = res)
        );
        this.store.dispatch(new GetSheetCounters());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSearchPositiveCase(search: number) {
        this.store.dispatch(new SearchPositiveCase('' + search));
    }

    onSearchSuspectCase(search: number) {
        this.store.dispatch(new SearchSuspectCase('' + search));
    }

    onKeepAliveButton() {
        this.store.dispatch(new OpenKeepAliveModal());
    }

}
