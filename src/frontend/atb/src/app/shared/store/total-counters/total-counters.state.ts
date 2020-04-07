import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CountersInterface, CountersResponseInterface } from '../../interface';
import { GetTotalCounters } from './total-counters.actions';
import { CountersService } from '../../../core/services/counters/counters.service';

export interface TotalCountersStateModel {
    counters: CountersInterface;
}

export const TotalCountersStateDefaults: TotalCountersStateModel = {
    counters: null
};

@Injectable()
@State<TotalCountersStateModel>({
    name: 'totalCounters',
    defaults: TotalCountersStateDefaults
})
export class TotalCountersState {

    @Selector()
    static totalCounters(state: TotalCountersStateModel) {
        return state.counters;
    }

    constructor(private countersService: CountersService) {
    }

    @Action(GetTotalCounters)
    getTotalCounters({ patchState }: StateContext<TotalCountersStateModel>) {
        this.countersService.getCounters('').subscribe( (res: CountersResponseInterface) => {
            if (res) {
                patchState({
                    counters: res.counters
                })
            }
        })
    }

}
