import { HistoryCaseInterface } from '../common';

export interface PositiveHistoryInterface extends HistoryCaseInterface {
    convertedToPositiveCaseNumber?: number;
    convertedToPositiveSheetClosed?: boolean
}
