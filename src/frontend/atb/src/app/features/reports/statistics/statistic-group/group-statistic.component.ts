import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GroupStatistic } from '../../../../shared/interface/statistics.interface';

@Component({
    selector: 'app-statistic-group',
    templateUrl: './group-statistic.component.html',
    styleUrls: [ './group-statistic.component.scss' ]
})
export class GroupStatisticComponent implements OnChanges {

    @Input() statisticGroup: GroupStatistic;

    suspectsTotalSick = 0;
    suspectsTotalClosed = 0;
    positivesTotalSick = 0;
    positivesTotalClosed = 0;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.statisticGroup && changes.statisticGroup.currentValue) {
            const _statisticGroupChanges: GroupStatistic = changes.statisticGroup.currentValue;
            if (_statisticGroupChanges) {
                this.countTotal(_statisticGroupChanges);
                // this.suspectsQuarantinePlacesFacet = this.mapSuspectsQuarantineFacet(_statisticsChanges);
                // this.positivesQuarantinePlacesFacet = this.mapPositiveQuarantineFacet(_statisticsChanges);
            }
        }
    }

    countTotal(_statistics: GroupStatistic): void {
        if (_statistics) {
            this.suspectsTotalSick += _statistics.suspects && _statistics.suspects.totalSick;
            this.suspectsTotalClosed += _statistics.suspects && _statistics.suspects.totalClosed;
            this.positivesTotalSick += _statistics.positives && _statistics.positives.totalSick;
            this.positivesTotalClosed += _statistics.positives && _statistics.positives.totalClosed;
        }
    }

}
