import { Roles } from '../enum/roles.enum';
import { UserInterface } from '../interface/common/user.interface';

export function checkRoles(roles: Roles[], user: UserInterface): boolean {
    for (let role of roles) {
        if (user.roles.includes(role)) {
            console.log('checkRoles ok');
            return true;
        }
    }
    console.log('checkRoles ko');
    return false;
}
