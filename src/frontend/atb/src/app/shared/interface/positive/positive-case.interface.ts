import { DataInterface, SubjectInterface } from '../common';
import { PositiveHistoryInterface } from './positive-history.interface';

export interface PositiveCaseInterface {
    subject: SubjectInterface;
    data: DataInterface;
    group?: string;
    history?: PositiveHistoryInterface[];
}
