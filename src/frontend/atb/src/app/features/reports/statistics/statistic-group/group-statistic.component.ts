import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GroupStatistic } from '../../../../shared/interface/statistics.interface';
import {
    chartsViewSize,
    roleSorter
} from '../../../../shared/functions';
import { Series } from '../../../../shared/interface/quarantine-group-facet.interface';

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

    suspectsRolesFacet: Series[];
    positivesRolesFacet: Series[];

    suspectsViewSize = [];
    positivesViewSize = [];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.statisticGroup && changes.statisticGroup.currentValue) {
            const _statisticGroupChanges: GroupStatistic = changes.statisticGroup.currentValue;
            if (_statisticGroupChanges) {
                this.countTotal(_statisticGroupChanges);
                this.positivesRolesFacet = this.mapPositiveRolesFacet(_statisticGroupChanges);
                this.suspectsRolesFacet = this.mapSuspectsRolesFacet(_statisticGroupChanges);
                this.suspectsViewSize = chartsViewSize(this.suspectsRolesFacet.length);
                this.positivesViewSize = chartsViewSize(this.positivesRolesFacet.length);
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

    mapPositiveRolesFacet(_statistics: GroupStatistic): Series[] {
        if (_statistics && _statistics.positives && _statistics.positives.roleFacet && _statistics.positives.roleFacet.length > 0) {
            const roles = _statistics.positives.roleFacet;
            return roles.map(value => {
                return {
                    name: value.name,
                    value: value.total
                }
            }).sort(roleSorter);
        } else {
            return [];
        }
    }

    mapSuspectsRolesFacet(_statistics: GroupStatistic): Series[] {
        if (_statistics && _statistics.suspects && _statistics.suspects.roleFacet && _statistics.suspects.roleFacet.length > 0) {
            const roles = _statistics.suspects.roleFacet;
            return roles.map(value => {
                return {
                    name: value.name,
                    value: value.total
                }
            }).sort(roleSorter);
        } else {
            return [];
        }
    }

}
