import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CountersInterface } from '../../interface/counters.interface';
import { GetTotalCounters } from './total-counters.actions';
import { CountersService } from '../../../core/services/counters/counters.service';
import { CountersResponseInterface } from '../../interface/common/counters-response.interface';

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

    constructor(private store: Store, private countersService: CountersService) {
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
