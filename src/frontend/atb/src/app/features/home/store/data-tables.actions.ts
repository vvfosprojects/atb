export class GetGroupList {
    static readonly type = '[DataTables] Get Groups List';
}

export class SetGroup {
    static readonly type = '[DataTables] Set Group';

    constructor(public selectedGroup: string) {
    }
}

export class SetTab {
    static readonly type = '[DataTables] Set Tab';

    constructor(public selectedTab: string) {
    }
}

export class GetDataSheets {
    static readonly type = '[DataTables] Get Data Sheets';
}

export class ClearDataTables {
    static readonly type = '[DataTables] Clear DataTables';
}
