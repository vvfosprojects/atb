export function openSuspect(historyCase: any): boolean {
    if (historyCase.convertedToSuspectCaseNumber && historyCase.convertedToSuspectSheetClosed || historyCase.convertedToPositiveCaseNumber && historyCase.convertedToPositiveSheetClosed) {
        return true;
    }
}
