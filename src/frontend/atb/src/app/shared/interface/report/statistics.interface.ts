export interface QuarantinePlacesFacet {
    home: number;
    hosp: number;
    intCare?: number;
}

export interface RoleFacet {
    name: string;
    total: number;
}

export interface GroupCase {
    totalSick: number;
    total: number;
    totalClosed: number;
    quarantinePlacesFacet: QuarantinePlacesFacet;
    roleFacet: RoleFacet[];
}

export interface GroupStatistic {
    group: string;
    positives: GroupPositives;
    suspects: GroupSuspects;
}

export type GroupPositives = Omit<GroupCase, 'total'>;

export type GroupSuspects = Omit<GroupCase, 'totalSick'>;
