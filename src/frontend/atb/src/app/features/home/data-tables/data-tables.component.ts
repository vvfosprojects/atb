import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GetDataSheets, GetGroupList, SetGroup } from '../store/data-tables.actions';
import { DataTablesState } from '../store/data-tables.state';
import { GroupInterface } from '../../../shared/interface/group.interface';
import { PositiveCaseInterface } from '../../../shared/interface/positive-case.interface';
import { SuspectCaseInterface } from '../../../shared/interface/suspect-case.interface';
import { LoadingState } from '../../../shared/store/loading/loading.state';
import { Navigate } from '@ngxs/router-plugin';

@Component({
    selector: 'app-data-tables',
    templateUrl: './data-tables.component.html',
    styleUrls: ['./data-tables.component.scss']
})
export class DataTablesComponent implements OnDestroy {

    @Select(DataTablesState.selectedGroup) selectedGroup$: Observable<string>;
    @Select(DataTablesState.groupsList) groupsList$: Observable<GroupInterface[]>;
    groupsList: GroupInterface[];

    @Select(LoadingState.loading) loading$: Observable<boolean>;
    loading: boolean;

    @Select(DataTablesState.patients) positiveList$: Observable<PositiveCaseInterface[]>;
    @Select(DataTablesState.suspects) suspectList$: Observable<SuspectCaseInterface[]>;

    private subscription = new Subscription();

    constructor(private store: Store) {
        this.store.dispatch(new GetGroupList());
        this.subscription.add(this.groupsList$.subscribe(res => this.groupsList = res));
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
        this.store.dispatch(new Navigate(['/home/form-positivo/detail/' + caseNumber]));
    }

    onSuspectDetail(caseNumber: number) {
        this.store.dispatch(new Navigate(['/home/form-assente/detail/' + caseNumber]));
    }

}
