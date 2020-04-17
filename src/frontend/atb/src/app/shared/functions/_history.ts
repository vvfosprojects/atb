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

export function firstConvertedPositiveCase(historyCases: PositiveHistoryInterface[], index: number): boolean {
    return !!(index === 0 && historyCases.length === 1);
}

export function firstConvertedSuspectCase(historyCases: SuspectHistoryInterface[], index: number): boolean {
    return !!(index === 0 && historyCases.length === 1);
}

export function actionOnConvertedPositive(historyCase: PositiveHistoryInterface, historyCases: PositiveHistoryInterface[], index: number): boolean {
    return firstConvertedPositiveCase(historyCases, index) || convertedPositiveCase(historyCase) && closedConvertedPositiveCase(historyCase);
}

export function actionOnConvertedSuspect(historyCase: SuspectHistoryInterface, historyCases: SuspectHistoryInterface[], index: number): boolean {
    return firstConvertedSuspectCase(historyCases, index) || convertedSuspectCase(historyCase) && closedConvertedSuspectCase(historyCase);
}
