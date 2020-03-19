import { Selector, State} from '@ngxs/store';
import { Injectable } from '@angular/core';

export interface QualificheStateModel {
    qualifiche: any[];
}

export const qualificheStateDefaults: QualificheStateModel = {
    qualifiche: []
};

@Injectable()
@State<QualificheStateModel>({
    name: 'qualifiche',
    defaults: qualificheStateDefaults
})
export class QualificheState {

    @Selector()
    static qualifiche(state: QualificheStateModel) {
        return state.qualifiche;
    }
}
