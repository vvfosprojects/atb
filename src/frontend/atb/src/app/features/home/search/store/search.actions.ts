export class SearchPositiveCase {
    static readonly type = '[Search] Search Positive Case';

    constructor(public caseNumber: number) {
    }
}

export class SearchSuspectCase {
    static readonly type = '[Search] Search Suspect Case';

    constructor(public caseNumber: number) {
    }
}