import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GroupStatistic, QuarantineGroupFacetInterface } from '../../../../shared/interface';
import {
    chartsViewSize,
    countTotalSeries,
    quarantineSorter,
    seriesPositive,
    seriesSuspects
} from '../../../../shared/functions/';

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

    suspectsViewSize = [];
    positivesViewSize = [];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.statistics && changes.statistics.currentValue) {
            const _statisticsChanges: GroupStatistic[] = changes.statistics.currentValue;
            if (_statisticsChanges) {
                this.countTotal(_statisticsChanges);
                this.suspectsQuarantinePlacesFacet = this.mapSuspectsQuarantineFacet(_statisticsChanges);
                this.positivesQuarantinePlacesFacet = this.mapPositiveQuarantineFacet(_statisticsChanges);
                this.suspectsViewSize = chartsViewSize(this.suspectsQuarantinePlacesFacet.length);
                this.positivesViewSize = chartsViewSize(this.positivesQuarantinePlacesFacet.length);
            }
        }
    }

    countTotal(_statistics: GroupStatistic[]): void {
        if (_statistics && _statistics.length > 0) {
            _statistics.forEach(group => {
                this.suspectsTotalSick += group.suspects && group.suspects.total;
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
                    series: value.positives ? seriesPositive(value.positives.quarantinePlacesFacet) : [],
                    total: value.positives ? countTotalSeries(seriesPositive(value.positives.quarantinePlacesFacet)) : 0
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
                    series: value.suspects ? seriesSuspects(value.suspects.quarantinePlacesFacet) : [],
                    total: value.suspects ? countTotalSeries(seriesSuspects(value.suspects.quarantinePlacesFacet)) : 0
                }
            }).sort(quarantineSorter);
        } else {
            return [];
        }
    }

}
