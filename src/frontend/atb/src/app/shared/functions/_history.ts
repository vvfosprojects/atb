import { PositiveHistoryInterface } from '../interface/positive';
import { SuspectHistoryInterface } from '../interface/suspect';

export function convertedPositiveCase(historyCase: PositiveHistoryInterface): boolean {
    return !!historyCase.convertedToSuspectCaseNumber;
}

export function convertedSuspectCase(historyCase: SuspectHistoryInterface): boolean {
    return !!historyCase.convertedToPositiveCaseNumber;
}

export function closedConvertedPositiveCase(historyCase: PositiveHistoryInterface): boolean {
    return !!historyCase.convertedToSuspectSheetClosed;
}

export function closedConvertedSuspectCase(historyCase: SuspectHistoryInterface): boolean {
    return !!historyCase.convertedToPositiveSheetClosed;
}
