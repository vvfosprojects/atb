import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { Observable, Subscription } from 'rxjs';
import { GetStatisticsData } from '../store/statistics.actions';
import { StatisticsState } from '../store/statistics.state';
import { GroupStatistic } from '../../../shared/interface/statistics.interface';


@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: [ './statistics.component.scss' ]
})
export class StatisticsComponent implements OnDestroy {

    @Select(StatisticsState.statistics) statistics$: Observable<GroupStatistic[]>;
    statistics: GroupStatistic[];

    private subscription = new Subscription();

    constructor(private store: Store) {
        this.store.dispatch(new GetStatisticsData());
        this.subscription.add(this.statistics$.subscribe(res => this.statistics = res));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onHome() {
        this.store.dispatch(new Navigate([ '/' ]));
    }

}
