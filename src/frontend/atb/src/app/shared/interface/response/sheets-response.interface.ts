import { PositiveCaseInterface } from '../positive/';
import { SuspectCaseInterface } from '../suspect/';

export interface SheetsResponseInterface {
    patients: PositiveCaseInterface[];
    suspects: SuspectCaseInterface[];
}
