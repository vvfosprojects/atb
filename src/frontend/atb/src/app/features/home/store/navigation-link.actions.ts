import { Roles } from '../../../shared/enum/roles.enum';

export class SetUserRoles {
    static readonly type = '[NavigationLink] Set User Roles';

    constructor(public userRoles: Roles[]) {
    }
}

export class SetUserGroup {
    static readonly type = '[NavigationLink] Set User Group';

    constructor(public userGroup: string) {
    }
}
