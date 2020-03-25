import { PermissionFeatures } from '../../enum/permission-features.enum';
import { Roles } from '../../enum/roles.enum';

export interface PermessiFeatureInterface {
    feature: PermissionFeatures;
    roles: Array<Roles>;
}
