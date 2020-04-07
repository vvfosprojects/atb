import { DtoNewCaseInterface, LinkCaseInterface } from '../../../shared/interface';

export class SetLink {
    static readonly type = '[ConvertCase] Set Link';

    constructor(public link: LinkCaseInterface) {
    }
}

export class SetSubject {
    static readonly type = '[ConvertCase] Set Subject';

    constructor(public subject: DtoNewCaseInterface) {
    }
}

export class SetConvertCase {
    static readonly type = '[ConvertCase] Set Convert Case';

    constructor(public convertCase: string) {
    }
}

export class ClearConvertCase {
    static readonly type = '[ConvertCase] Clear ConvertCase';

    constructor(public convertCase: string) {
    }
}
