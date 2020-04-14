import { HistoryCaseInterface } from '../common';

export interface PositiveHistoryInterface extends HistoryCaseInterface {
    convertedToSuspectCaseNumber: number;
    convertedToSuspectSheetClosed: boolean
}
