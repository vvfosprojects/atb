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

export class GoToPositiveSheet {
    static readonly type = '[NavigationLink] Go To Positive Sheet';

    constructor(public url: string, public closed: boolean) {
    }
}

export class GoToSuspectSheet {
    static readonly type = '[NavigationLink] Go To Suspect Sheet';

    constructor(public url: string, public closed: boolean) {
    }
}
