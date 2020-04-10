import { HistoryCaseInterface } from '../common';

export interface SuspectHistoryInterface extends HistoryCaseInterface {
    convertedToSuspectCaseNumber?: number;
    convertedToSuspectSheetClosed?: boolean
}
