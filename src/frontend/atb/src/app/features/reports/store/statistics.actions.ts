export class GetStatisticsData {
    static readonly type = '[Statistics] Get Statistics Data';
}

export class SetStatisticsTab {
    static readonly type = '[Statistics] Set Statistics Tab';

    constructor(public selectedTab: string) {
    }
}

export class ClearStatisticsData {
    static readonly type = '[Statistics] Clear Statistics Data';
}
