export class SetErrorMessage {
  static readonly type = '[Login] Set Error Message';

  constructor(public errorMessage: string) {
  }
}

export class SetReturnUrl {
  static readonly type = '[Login] Set Return Url';

  constructor(public returnUrl: string) {
  }
}

export class ClearLogin {
  static readonly type = '[Login] Clear Login';
}

export class Login {
  static readonly type = '[Login] Sign In';
}

export class Logout {
  static readonly type = '[Login] Sign Out';
}
