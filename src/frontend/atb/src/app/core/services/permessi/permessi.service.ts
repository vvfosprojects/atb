import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PermissionFeatures } from '../../../shared/enum/permission-features.enum';
import { PermessiState } from '../../../shared/store/permessi/permessi.state';
import { AuthState } from '../../../features/auth/store/auth.state';
import { UserInterface } from '../../../shared/interface/common/user.interface';
import { PermessiFeatureInterface } from '../../../shared/interface/common/permessi-feature.interface';
import { Roles } from '../../../shared/enum/roles.enum';

@Injectable({
    providedIn: 'root'
})
export class PermessiService {

    @Select(AuthState.currentUser) utente$: Observable<UserInterface>;
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
        this.utente$.subscribe((utente: UserInterface) => {
            this.utente = utente;
        });
    }

    checkUserPermissionByFeature(feature: PermissionFeatures) {
        const featureIndex = searchFeatureIndex(this.permessi, feature);
        if (this.utente && this.utente.roles && this.utente.roles.length > 0 && this.permessi && featureIndex !== null) {
            if (checkRuoliUtente(this.utente, this.permessi, featureIndex)) {
                return true;
            }
        }
        return false;

        function checkRuoliUtente(utente: UserInterface, permessi: PermessiFeatureInterface[], index: number) {
            let count = 0;
            utente.roles.forEach((ruolo: Roles) => {
                if (permessi[index].roles.indexOf(ruolo) !== -1) {
                    count++;
                }
            });
            return count > 0;
        }

        function searchFeatureIndex(permessi: PermessiFeatureInterface[], permissionFeature: PermissionFeatures) {
            let index = null;
            permessi.forEach((permesso: PermessiFeatureInterface, i: number) => {
                if (permesso.feature === permissionFeature) {
                    index = i;
                }
            });
            return index;
        }
    }
}
