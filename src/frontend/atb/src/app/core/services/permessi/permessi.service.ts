import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { PermissionFeatures } from '../../../shared/enum/permission-features.enum';
import { PermessiState } from '../../../shared/store/permessi/permessi.state';
import { AuthState } from '../../../features/auth/store/auth.state';
import { PermessiFeatureInterface } from '../../../shared/interface/common/permessi-feature.interface';
import { UserInterface } from '../../../shared/interface/common';

@Injectable({
    providedIn: 'root'
})
export class PermessiService {

    utente: UserInterface;
    permessi: PermessiFeatureInterface[];

    constructor(private store: Store) {
        this.getUtente();
        this.getPermessi();
    }

    getPermessi() {
        this.permessi = this.store.selectSnapshot(PermessiState.permessi);
    }

    getUtente() {
        this.utente = this.store.selectSnapshot(AuthState.currentUser);
    }

    checkUserPermissionByFeature(feature: PermissionFeatures) {
        let count = 0;
        if (this.permessi) {
            const permissionFeatures = this.permessi.filter( value => value.feature === feature);
            this.utente.roles.forEach( ruolo => {
                if (permissionFeatures[0].roles.indexOf(ruolo) !== -1) {
                    count++;
                }
            });
        }
        return count > 0;
    }
}
