import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { RssService } from '../../../core/services/rss/rss.service';
import { RssInterface } from '../../../shared/interface/rss.interface';
import { ClearRssData, GetRssData } from './rss.actions';

export interface RssStateModel {
    rssData: RssInterface[];
}

export const RssStateDefaults: RssStateModel = {
    rssData: []
};

@Injectable()
@State<RssStateModel>({
    name: 'rss',
    defaults: RssStateDefaults
})
export class RssState {

    @Selector()
    static rssData(state: RssStateModel) {
        return state.rssData;
    }

    constructor(private rssService: RssService) {
    }

    @Action(GetRssData)
    getRssData({ patchState }: StateContext<RssStateModel>) {
        this.rssService.getRssData().subscribe(res => {
            console.log('GetRssData', res)
            if (res) {
                patchState({
                    rssData: res.data
                })
            }
        })
    }

    @Action(ClearRssData)
    clearRssData({ patchState }: StateContext<RssStateModel>) {
        patchState(RssStateDefaults);
    }

}
