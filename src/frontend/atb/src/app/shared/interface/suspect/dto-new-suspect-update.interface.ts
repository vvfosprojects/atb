import { HealthMeasureInterface } from './health-measure.interface';

export interface DtoNewSuspectUpdateInterface {
    caseNumber: number;
    quarantinePlace: string;
    expectedWorkReturnDate: string;
    actualWorkReturnDate?: string;
    healthMeasure: HealthMeasureInterface;
}
