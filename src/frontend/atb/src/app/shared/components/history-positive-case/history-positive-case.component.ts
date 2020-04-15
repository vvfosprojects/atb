import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PositiveHistoryInterface } from '../../interface/positive';
import { openSuspect } from '../../functions';

@Component({
    selector: 'app-history-positive-case',
    templateUrl: './history-positive-case.component.html',
    styleUrls: [ './history-both-case.component.scss' ]
})
export class HistoryPositiveCaseComponent {

    @Input() historyCase: PositiveHistoryInterface[];
    @Output() suspectCaseOpen = new EventEmitter<number>();

    onCaseNumber(historyCase: PositiveHistoryInterface): void {
        const caseNumber = historyCase.convertedToSuspectCaseNumber;

        if (openSuspect(historyCase)) {
            console.log(historyCase.convertedToSuspectSheetClosed);
            this.suspectCaseOpen.emit(caseNumber);
        }

    }

}
