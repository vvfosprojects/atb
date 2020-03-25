import { Selector, State } from '@ngxs/store';
import { PermissionFeatures } from '../../enum/permission-features.enum';
import { PermessiFeatureInterface } from '../../interface/common/permessi-feature.interface';
import { Roles } from '../../enum/roles.enum';
import { Injectable } from '@angular/core';

export interface PermessiStateModel {
    permessi: Array<PermessiFeatureInterface>;
}

export const PermessiStateDefaults: PermessiStateModel = {
    permessi: [
        {
            feature: PermissionFeatures.CreateAndSearch,
            roles: []
        },
        {
            feature: PermissionFeatures.GroupSearch,
            roles: []
        },
        {
            feature: PermissionFeatures.Report,
            roles: []
        }
    ]
};

@Injectable()
@State<PermessiStateModel>({
    name: 'permessi',
    defaults: PermessiStateDefaults
})
export class PermessiState {

    @Selector()
    static permessi(state: PermessiStateModel) {
        return state.permessi;
    }

}
