export class SearchPositiveCase {
    static readonly type = '[Search] Search Positive Case';

    constructor(public caseNumber: number) {
    }
}

export class ClearPositiveCase {
    static readonly type = '[Search] Clear Positive Case';
}

export class SearchSuspectCase {
    static readonly type = '[Search] Search Suspect Case';

    constructor(public caseNumber: number) {
    }
}

export class ClearSuspectCase {
    static readonly type = '[Search] Clear Suspect Case';
}
