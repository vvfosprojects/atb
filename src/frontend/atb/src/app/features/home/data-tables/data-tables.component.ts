import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GetGroupList } from '../store/data-tables.actions';
import { DataTablesState } from '../store/data-tables.state';
import { GroupInterface } from '../../../shared/interface/group.interface';

@Component({
    selector: 'app-data-tables',
    templateUrl: './data-tables.component.html',
    styleUrls: [ './data-tables.component.scss' ]
})
export class DataTablesComponent implements OnDestroy {

    @Select(DataTablesState.groupsList) groupsList$: Observable<GroupInterface[]>;
    groupsList: GroupInterface[];

    private subscription = new Subscription();

    constructor(private store: Store) {
        this.store.dispatch(new GetGroupList());
        this.subscription.add(this.groupsList$.subscribe( res => this.groupsList = res));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
