import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ClearStatisticsData, GetStatisticsData } from './statistics.actions';
import { StatisticsService } from '../../../core/services/statistics/statistics.service';
import { GroupStatistic } from '../../../shared/interface/statistics.interface';

export interface StatisticsStateModel {
    groupStatistics: GroupStatistic[];
}

export const StatisticsStateDefaults: StatisticsStateModel = {
    groupStatistics: []
};

@Injectable()
@State<StatisticsStateModel>({
    name: 'statistics',
    defaults: StatisticsStateDefaults
})
export class StatisticsState {

    @Selector()
    static statistics(state: StatisticsStateModel) {
        return state.groupStatistics;
    }

    constructor(private statisticsService: StatisticsService) {
    }

    @Action(GetStatisticsData)
    getStatisticsData({ patchState }: StateContext<StatisticsStateModel>) {
        this.statisticsService.getStatisticsData().subscribe(res => {
            console.log('GetStatisticsData', res);
            patchState({ groupStatistics: res.groupStatistics });
        })
    }

    @Action(ClearStatisticsData)
    clearStatisticsData({ patchState }: StateContext<StatisticsStateModel>) {
        patchState(StatisticsStateDefaults);
    }

}