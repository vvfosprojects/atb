import { UserInterface } from '../../../shared/interface';

export class SetCurrentJwt {
    static readonly type = '[Auth] Set current Jwt';

    constructor(public currentJwt: string) {
    }
}

export class SetCurrentUser {
    static readonly type = '[Auth] Set current User';

    constructor(public currentUser: UserInterface) {
    }
}

export class SetLogged {
    static readonly type = '[Auth] Set Logged';
}

export class SetReturnUrl {
    static readonly type = '[Auth] Set Return Url';

    constructor(public returnUrl: string) {
    }
}

export class RecoveryUrl {
    static readonly type = '[Auth] Recovery Url';
}

export class ClearAuth {
    static readonly type = '[Auth] Clear auth';
}
