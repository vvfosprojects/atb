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
    totalClosed: number;
    quarantinePlacesFacet: QuarantinePlacesFacet;
    roleFacet: RoleFacet[];
}

export interface GroupStatistic {
    group: string;
    positives: GroupCase;
    suspects: GroupCase;
}
