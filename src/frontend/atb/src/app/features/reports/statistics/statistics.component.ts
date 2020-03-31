import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GetStatisticsData } from '../store/statistics.actions';
import { StatisticsState } from '../store/statistics.state';
import { GroupStatistic } from '../../../shared/interface/statistics.interface';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { SetTab } from '../../home/store/data-tables.actions';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: [ './statistics.component.scss' ]
})
export class StatisticsComponent implements OnDestroy {

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    loading: boolean;

    @Select(StatisticsState.statistics) statistics$: Observable<GroupStatistic[]>;
    statistics: GroupStatistic[];

    @Select(StatisticsState.selectedTab) selectedTab$: Observable<string>;

    private subscription = new Subscription();

    constructor(private store: Store) {
        this.store.dispatch(new GetStatisticsData());
        this.subscription.add(this.statistics$.subscribe(res => this.statistics = res));
        this.subscription.add(this.loading$.subscribe(res => this.loading = res));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSelectTab($event: NgbTabChangeEvent) {
        this.store.dispatch(new SetTab($event.nextId));
    }

}
