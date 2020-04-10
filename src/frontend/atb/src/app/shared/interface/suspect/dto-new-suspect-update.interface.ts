import { HealthMeasureInterface } from './health-measure.interface';
import { DtoNewUpdateInterface } from '../common';

export interface DtoNewSuspectUpdateInterface extends DtoNewUpdateInterface {
    healthMeasure: HealthMeasureInterface;
    convertToPositive: boolean;
}
