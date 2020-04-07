import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { RssService } from '../../../core/services/rss/rss.service';
import { RssInterface } from '../../../shared/interface';
import { ClearRssData, GetRssData } from './rss.actions';
import { rssSorter } from '../../../shared/functions';

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
            console.log('GetRssData', res);
            if (res && res.news && res.news.length > 0) {
                patchState({
                    rssData: res.news.sort(rssSorter)
                })
            } else {
                patchState({
                    rssData: [
                        {
                            text: "Siamo spiacenti, ma al momento non ci sono <i>news</i>.",
                            highlight: true,
                            order: 0
                        }
                    ]
                })
            }
        })
    }

    @Action(ClearRssData)
    clearRssData({ patchState }: StateContext<RssStateModel>) {
        patchState(RssStateDefaults);
    }

}
