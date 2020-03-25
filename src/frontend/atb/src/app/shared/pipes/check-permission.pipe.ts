import { Pipe, PipeTransform } from '@angular/core';
import { PermissionFeatures } from '../enum/permission-features.enum';
import { PermessiService } from '../../core/services/permessi/permessi.service';

@Pipe({
    name: 'checkPermission',
    pure: false
})
export class CheckPermissionPipe implements PipeTransform {

    constructor(private permessiService: PermessiService) {
    }

    transform(feature: PermissionFeatures, args?: any): any {
        return !this.permessiService.checkUserPermissionByFeature(feature);
    }

}
