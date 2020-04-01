import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GroupStatistic } from '../../../../shared/interface/statistics.interface';
import { QuarantineGroupFacetInterface } from '../../../../shared/interface/quarantine-group-facet.interface';
import { countTotalSeries, quarantineSorter, seriesPositive, seriesSuspects } from '../../../../shared/functions/';

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

    suspectsQuarantinePlacesFacet: QuarantineGroupFacetInterface[];
    positivesQuarantinePlacesFacet: QuarantineGroupFacetInterface[];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.statistics && changes.statistics.currentValue) {
            const _statisticsChanges: GroupStatistic[] = changes.statistics.currentValue;
            if (_statisticsChanges) {
                this.countTotal(_statisticsChanges);
                this.suspectsQuarantinePlacesFacet = this.mapSuspectsQuarantineFacet(_statisticsChanges);
                this.positivesQuarantinePlacesFacet = this.mapPositiveQuarantineFacet(_statisticsChanges);

            }
        }
    }

    countTotal(_statistics: GroupStatistic[]): void {
        if (_statistics && _statistics.length > 0) {
            _statistics.forEach(group => {
                this.suspectsTotalSick += group.suspects && group.suspects.totalSick;
                this.suspectsTotalClosed += group.suspects && group.suspects.totalClosed;
                this.positivesTotalSick += group.positives && group.positives.totalSick;
                this.positivesTotalClosed += group.positives && group.positives.totalClosed;
            });
        }
    }

    mapPositiveQuarantineFacet(_statistics: GroupStatistic[]): QuarantineGroupFacetInterface[] {
        if (_statistics && _statistics.length > 0) {
            return _statistics.map(value => {
                return {
                    name: value.group,
                    series: value.positives && seriesPositive(value.positives.quarantinePlacesFacet),
                    total: value.positives && countTotalSeries(seriesPositive(value.positives.quarantinePlacesFacet))
                }
            }).sort(quarantineSorter);
        } else {
            return [];
        }
    }

    mapSuspectsQuarantineFacet(_statistics: GroupStatistic[]): QuarantineGroupFacetInterface[] {
        if (_statistics && _statistics.length > 0) {
            return _statistics.map(value => {
                return {
                    name: value.group,
                    series: value.suspects && seriesSuspects(value.suspects.quarantinePlacesFacet),
                    total: value.suspects && countTotalSeries(seriesSuspects(value.suspects.quarantinePlacesFacet))
                }
            }).sort(quarantineSorter);
        } else {
            return [];
        }
    }

}
