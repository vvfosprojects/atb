import { DtoNewUpdateInterface } from '../common';

export interface DtoNewPositiveUpdateInterface extends DtoNewUpdateInterface  {
    estremiProvvedimentiASL?: string;
    diseaseConfirmDate: string;
    convertToSuspect: boolean;
}
