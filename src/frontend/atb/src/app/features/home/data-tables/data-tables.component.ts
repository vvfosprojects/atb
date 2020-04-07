import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GetGroupList, SetGroup, SetTab } from '../store/data-tables.actions';
import { DataTablesState } from '../store/data-tables.state';
import { GroupInterface } from '../../../shared/interface/group.interface';
import { PositiveCaseInterface } from '../../../shared/interface/positive/positive-case.interface';
import { SuspectCaseInterface } from '../../../shared/interface/suspect/suspect-case.interface';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { Navigate } from '@ngxs/router-plugin';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { LSNAME } from '../../../core/settings/config';
import { CountersInterface } from '../../../shared/interface/counters.interface';

@Component({
    selector: 'app-data-tables',
    templateUrl: './data-tables.component.html',
    styleUrls: [ './data-tables.component.scss' ]
})
export class DataTablesComponent implements OnDestroy {

    @Select(DataTablesState.selectedGroup) selectedGroup$: Observable<string>;
    selectedGroup;

    @Select(DataTablesState.selectedTab) selectedTab$: Observable<string>;
    @Select(DataTablesState.groupsList) groupsList$: Observable<GroupInterface[]>;
    groupsList: GroupInterface[];

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    loading: boolean;

    @Select(DataTablesState.patients) positiveList$: Observable<PositiveCaseInterface[]>;
    @Select(DataTablesState.suspects) suspectList$: Observable<SuspectCaseInterface[]>;
    @Select(DataTablesState.counters) counters$: Observable<CountersInterface>;
    counters: CountersInterface;

    private subscription = new Subscription();

    constructor(private store: Store) {
        this.store.dispatch(new GetGroupList());
        this.subscription.add(this.groupsList$.subscribe(res => this.groupsList = res));
        this.subscription.add(this.selectedGroup$.subscribe(res => this.selectedGroup = res));
        this.subscription.add(this.counters$.subscribe(res => this.counters = res));
        this.getLoading();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getLoading() {
        this.subscription.add(
            this.loading$.subscribe((value: boolean) => {
                console.log('loading', value);
                this.loading = value;
            })
        );
    }

    onSearch(groupCode: string) {
        this.store.dispatch(new SetGroup(groupCode));
    }

    onPositiveDetail(caseNumber: number) {
        this.store.dispatch(new Navigate([ '/home/form-positivo/detail/' + `${this.selectedGroup}${LSNAME.detailDelimiter}${caseNumber}` ]));
    }

    onSuspectDetail(caseNumber: number) {
        this.store.dispatch(new Navigate([ '/home/form-assente/detail/' + `${this.selectedGroup}${LSNAME.detailDelimiter}${caseNumber}` ]));
    }

    onSelectTab($event: NgbTabChangeEvent) {
        this.store.dispatch(new SetTab($event.nextId));
    }

}
