import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GroupStatistic, QuarantinePlacesFacet } from '../../../../shared/interface/statistics.interface';
import { QuarantineGroupFacetInterface, Series } from '../../../../shared/interface/quarantine-group-facet.interface';

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
                this.suspectsTotalSick += group.suspects.totalSick;
                this.suspectsTotalClosed += group.suspects.totalClosed;
                this.positivesTotalSick += group.positives.totalSick;
                this.positivesTotalClosed += group.positives.totalClosed;
            });
        }
    }

    mapPositiveQuarantineFacet(_statistics: GroupStatistic[]): QuarantineGroupFacetInterface[] {
        if (_statistics && _statistics.length > 0) {
            return _statistics.map(value => {
                return {
                    name: value.group,
                    series: seriesPositive(value.positives.quarantinePlacesFacet)
                }
            });
        }
    }

    mapSuspectsQuarantineFacet(_statistics: GroupStatistic[]): QuarantineGroupFacetInterface[] {
        if (_statistics && _statistics.length > 0) {
            return _statistics.map(value => {
                return {
                    name: value.group,
                    series: seriesSuspects(value.suspects.quarantinePlacesFacet)
                }
            });
        }
    }

}

export function seriesPositive(quarantineFacet: QuarantinePlacesFacet): Series[] {
    const quarantineSeries: Series[] = [];
    quarantineSeries.push({ name: 'Domicilio', value: quarantineFacet.home });
    quarantineSeries.push({ name: 'Ospedale', value: quarantineFacet.hosp });
    quarantineSeries.push({ name: 'Terapia Intensiva', value: quarantineFacet.intCare });
    return quarantineSeries;
}

export function seriesSuspects(quarantineFacet: QuarantinePlacesFacet): Series[] {
    const quarantineSeries: Series[] = [];
    quarantineSeries.push({ name: 'Domicilio', value: quarantineFacet.home });
    // quarantineSeries.push({ name: 'Ospedale', value: quarantineFacet.hosp });
    return quarantineSeries;
}
