import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

    constructor(private store: Store) {
    }

    onHome() {
        this.store.dispatch(new Navigate(['/']));
    }

}
