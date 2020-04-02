export class SearchPositiveCase {
    static readonly type = '[Search] Search Positive Case';

    constructor(public caseNumber: string, public bookmark?: boolean) {
    }
}

export class ClearPositiveCase {
    static readonly type = '[Search] Clear Positive Case';
}

export class SearchSuspectCase {
    static readonly type = '[Search] Search Suspect Case';

    constructor(public caseNumber: string, public bookmark?: boolean) {
    }
}

export class ClearSuspectCase {
    static readonly type = '[Search] Clear Suspect Case';
}

export class GetSheetCounters {
    static readonly type = '[Search] Get Sheet Counters';
}

export class SetNotFound {
    static readonly type = '[Search] Case Not Found';
}

export class SetKeepAliveConfirm {
    static readonly type = '[Search] Set Keep Alive Confirm';

    constructor(public keepAliveConfirm: string) {
    }
}

export class OpenKeepAliveModal {
    static readonly type = '[Search] Open Keep Alive Modal';
}
