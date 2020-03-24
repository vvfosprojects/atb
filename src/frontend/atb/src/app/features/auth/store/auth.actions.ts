import { UserInterface } from '../../../shared/interface/common/user.interface';

// export class GetAuth {
//     static readonly type = '[Auth] Get Auth';
// }

export class SetCurrentJwt {
    static readonly type = '[Auth] Set current Jwt';

    constructor(public currentJwt: string) {
    }
}

// export class SetCurrentTicket {
//     static readonly type = '[Auth] Set current Ticket';
//
//     constructor(public currentTicket: string) {
//     }
// }

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

// export class CasLogin {
//     static readonly type = '[Auth] Cas Login';
// }
//
// export class CasResponse {
//     static readonly type = '[Auth] Cas Response';
//
//     constructor(public ticket: string) {
//     }
// }
//
// export class CasLogout {
//     static readonly type = '[Auth] Cas Logout';
// }

export class ClearAuth {
    static readonly type = '[Auth] Clear auth';
}
