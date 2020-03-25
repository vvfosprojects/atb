import { PositiveCaseInterface } from '../positive-case.interface';
import { SuspectCaseInterface } from '../suspect-case.interface';

export interface SheetsResponseInterface {
    patients: PositiveCaseInterface[];
    suspects: SuspectCaseInterface[];
}
