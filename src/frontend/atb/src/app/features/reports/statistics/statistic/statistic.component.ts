import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GroupStatistic } from '../../../../shared/interface/statistics.interface';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: [ './statistic.component.scss' ]
})
export class StatisticComponent implements OnChanges {

    @Input() statistics: GroupStatistic[];

    suspectsTotalSick = 0;
    suspectsTotalClosed = 0;
    positivesTotalSick = 0;
    positivesTotalClosed = 0;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.statistics && changes.statistics.currentValue) {
            const _statisticsChanges: GroupStatistic[] = changes.statistics.currentValue;
            if (_statisticsChanges) {
                this.countTotal(_statisticsChanges);
            }
        }
    }

    countTotal(_statistics: GroupStatistic[]): void {
        if (_statistics && _statistics.length > 0) {
            _statistics.forEach( group => {
                this.suspectsTotalSick += group.suspects.totalSick;
                this.suspectsTotalClosed += group.suspects.totalClosed;
                this.positivesTotalSick += group.positives.totalSick;
                this.positivesTotalClosed += group.positives.totalClosed;
            })
        }
    }

}
