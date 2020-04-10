import { DataInterface, SubjectInterface } from '../common';
import { SuspectHistoryInterface } from './suspect-history.interface';

export interface SuspectCaseInterface {
    subject: SubjectInterface;
    data: DataInterface;
    group?: string;
    history?: SuspectHistoryInterface[];
}
