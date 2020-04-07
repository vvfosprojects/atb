import { LinkCaseInterface } from './link-case.interface';

export interface DtoNewUpdateInterface {
    caseNumber: number;
    quarantinePlace: string;
    expectedWorkReturnDate: string;
    actualWorkReturnDate?: string;
    link?: LinkCaseInterface
}
