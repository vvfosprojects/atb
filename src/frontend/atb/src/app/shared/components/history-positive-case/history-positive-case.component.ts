import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PositiveHistoryInterface } from '../../interface/positive';
import { convertedPositiveCase } from '../../functions';

@Component({
    selector: 'app-history-positive-case',
    templateUrl: './history-positive-case.component.html',
    styleUrls: [ './history-both-case.component.scss' ]
})
export class HistoryPositiveCaseComponent {

    @Input() historyCase: PositiveHistoryInterface[];
    @Output() suspectCaseOpen = new EventEmitter<number>();

    onCaseNumber(historyCase: PositiveHistoryInterface, index: number): void {

        const caseNumber = historyCase.convertedToSuspectCaseNumber;
        if (convertedPositiveCase(historyCase)) {
            console.log(historyCase.convertedToSuspectSheetClosed, caseNumber);
            // this.suspectCaseOpen.emit(caseNumber);
        }

    }

}
