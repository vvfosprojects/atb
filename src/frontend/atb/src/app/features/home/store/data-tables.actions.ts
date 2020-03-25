export class GetGroupList {
    static readonly type = '[DataTables] Get Groups List';
}

export class SetGroup {
    static readonly type = '[DataTables] Set Group';

    constructor(public selectedGroup: string) {
    }
}

export class GetDataSheets {
    static readonly type = '[DataTables] Get Data Sheets';
}

export class ClearDataTables {
    static readonly type = '[DataTables] Clear DataTables';
}
