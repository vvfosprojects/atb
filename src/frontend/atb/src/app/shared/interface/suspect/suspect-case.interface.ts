import { DataInterface, HistoryCaseInterface, SubjectInterface } from '../common';

export interface SuspectCaseInterface {
    subject: SubjectInterface;
    data: DataInterface;
    group?: string;
    history?: HistoryCaseInterface[];
}
