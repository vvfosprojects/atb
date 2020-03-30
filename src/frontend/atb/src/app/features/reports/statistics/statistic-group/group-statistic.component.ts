import { Component, Input, OnInit } from '@angular/core';
import { GroupStatistic } from '../../../../shared/interface/statistics.interface';

@Component({
    selector: 'app-statistic-group',
    templateUrl: './group-statistic.component.html',
    styleUrls: [ './group-statistic.component.scss' ]
})
export class GroupStatisticComponent implements OnInit {

    @Input() statisticGroup: GroupStatistic;

    constructor() {
    }

    ngOnInit(): void {
    }

}
