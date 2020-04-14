import { HistoryCaseInterface } from '../common';

export interface SuspectHistoryInterface extends HistoryCaseInterface {
    convertedToPositiveCaseNumber: number;
    convertedToPositiveSheetClosed: boolean
}
