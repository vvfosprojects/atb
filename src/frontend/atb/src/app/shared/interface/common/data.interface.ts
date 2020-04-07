import { QuarantinePlaceEnum } from '../../enum/quarantine-place.enum';
import { HealthMeasureInterface } from '../suspect';

export interface DataInterface {
    estremiProvvedimentiASL?: string;
    diseaseConfirmDate: string;
    dateOfDeath?: string;
    quarantinePlace: QuarantinePlaceEnum;
    expectedWorkReturnDate: string;
    actualWorkReturnDate?: string;
    healthMeasure?: HealthMeasureInterface;
}
