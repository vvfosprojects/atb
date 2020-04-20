import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuspectHistoryInterface } from '../../interface/suspect';
import { actionOnConvertedSuspect } from '../../functions';

@Component({
    selector: 'app-history-suspect-case',
    templateUrl: './history-suspect-case.component.html',
    styleUrls: [ '../history-positive-case/history-both-case.component.scss' ]
})
export class HistorySuspectCaseComponent {

    @Input() historyCase: SuspectHistoryInterface[];
    @Output() positiveCaseOpen = new EventEmitter<number>();

    onCaseNumber(historyCase: SuspectHistoryInterface, index: number): void {

        const caseNumber = historyCase.convertedToPositiveCaseNumber;
        if (actionOnConvertedSuspect(historyCase, this.historyCase, index)) {
            console.log(historyCase.convertedToPositiveSheetClosed, caseNumber);
            this.positiveCaseOpen.emit(caseNumber);
        }
    }

}
