import { DataInterface, HistoryCaseInterface, SubjectInterface } from '../common';

export interface PositiveCaseInterface {
    subject: SubjectInterface;
    data: DataInterface;
    group?: string;
    history?: HistoryCaseInterface[];
}
