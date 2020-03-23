export interface DtoNewSuspectUpdateInterface {
    caseNumber: number;
    quarantinePlace: string;
    expectedWorkReturnDate: string;
    actualWorkReturnDate?: string;
    healthMeasure: HealthMeasureInterface;
}

export interface HealthMeasureInterface {
    code: string;
    by: string;
}
