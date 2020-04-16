import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuspectHistoryInterface } from '../../interface/suspect';
import { convertedSuspectCase } from '../../functions';

@Component({
    selector: 'app-history-suspect-case',
    templateUrl: './history-suspect-case.component.html',
    styleUrls: [ '../history-positive-case/history-both-case.component.scss' ]
})
export class HistorySuspectCaseComponent {

    @Input() historyCase: SuspectHistoryInterface[];
    @Output() positiveCaseOpen = new EventEmitter<number>();

    onCaseNumber(historyCase: SuspectHistoryInterface, index: number): void {

        // if (convertedCase(historyCase)) {
        //     const caseNumber = historyCase.convertedToPositiveCaseNumber;
        //     console.log(historyCase.convertedToPositiveSheetClosed, caseNumber);
        //     if (index === 0 && this.historyCase.length === 1 ) {
        //         console.log('First converted case', caseNumber);
        //         // this.positiveCaseOpen.emit(caseNumber);
        //     }
        // }

        const caseNumber = historyCase.convertedToPositiveCaseNumber;
        if (convertedSuspectCase(historyCase)) {
            console.log(historyCase.convertedToPositiveSheetClosed, caseNumber);
            // this.suspectCaseOpen.emit(caseNumber);
        }
    }

}
