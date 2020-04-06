import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { UserInterface } from '../../shared/interface/common';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { RoutesPath } from '../../shared/enum/routes-path.enum';
import { PermissionFeatures } from '../../shared/enum/permission-features.enum';
import { CountersInterface } from '../../shared/interface/counters.interface';
import { Roles } from '../../shared/enum/roles.enum';
import { Observable, Subscription } from 'rxjs';
import { GetTotalCounters } from '../../shared/store/total-counters/total-counters.actions';
import { TotalCountersState } from '../../shared/store/total-counters/total-counters.state';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnChanges, OnDestroy {

    @Input() currentUser: UserInterface;

    routesPath = RoutesPath;
    permissionFeatures = PermissionFeatures;

    @Select(TotalCountersState.totalCounters) counters$: Observable<CountersInterface>;
    counters: CountersInterface;

    private subscription = new Subscription();

    constructor(private store: Store) {
        this.subscription.add(this.counters$.subscribe(res => this.counters = res));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.currentUser && changes.currentUser.currentValue) {
            const currentUser: UserInterface = changes.currentUser.currentValue;
            if (currentUser && currentUser.roles.includes(Roles.Supervisor)) {
                this.store.dispatch(new GetTotalCounters());
            }
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    goToSearch() {
        this.store.dispatch(new Navigate([ '/' ]));
    }

    onLogout() {
        this.store.dispatch(new Navigate([ '/logout' ]));
    }

    onReset() {
        this.store.dispatch(new Navigate([ '/reset' ]));
    }

}
