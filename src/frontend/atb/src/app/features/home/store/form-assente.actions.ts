import { LinkCaseInterface } from '../../../shared/interface/common';

export class SetPageTitleFormAssente {
    static readonly type = '[FormAssente] Set Page Title Form Assente';

    constructor(public title: string) {
    }
}

export class SaveNewSuspectCase {
    static readonly type = '[FormAssente] Save New Suspect Case';

    constructor(public link?: LinkCaseInterface) {
    }
}

export class ConvertSuspectCase {
    static readonly type = '[FormAssente] Convert Suspect Case';
}

export class UpdateSuspectCase {
    static readonly type = '[FormAssente] Update Suspect Case';

    constructor(public convertToPositive = false) {
    }
}

export class ClearFormAssente {
    static readonly type = '[FormAssente] Clear State';
}
