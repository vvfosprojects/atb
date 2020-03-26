import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../shared/interface/common';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { RoutesPath } from '../../shared/enum/routes-path.enum';
import { PermissionFeatures } from '../../shared/enum/permission-features.enum';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit {

    @Input() currentUser: UserInterface;
    routesPath = RoutesPath;
    permissionFeatures = PermissionFeatures;

    constructor(private store: Store) {
    }

    ngOnInit(): void {
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
