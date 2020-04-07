import { PositiveCaseInterface } from '../positive/positive-case.interface';
import { SuspectCaseInterface } from '../suspect/suspect-case.interface';

export interface SheetsResponseInterface {
    patients: PositiveCaseInterface[];
    suspects: SuspectCaseInterface[];
}
