import { Component, Input, OnInit } from '@angular/core';
import { GroupStatistic } from '../../../../shared/interface/statistics.interface';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: [ './statistic.component.scss' ]
})
export class StatisticComponent implements OnInit {

    @Input() statistics: GroupStatistic[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
