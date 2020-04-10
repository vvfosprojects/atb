import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PositiveHistoryInterface, SuspectHistoryInterface } from '../../interface';

@Component({
    selector: 'app-history-case',
    templateUrl: './history-case.component.html',
    styleUrls: [ './history-case.component.scss' ]
})
export class HistoryCaseComponent {

    @Input() historyCase: SuspectHistoryInterface[] | PositiveHistoryInterface[];
    @Input() caseType: string = 'positive';
    @Output() caseNumber = new EventEmitter<number>();

    onCaseNumber(historyCase: any): void {
        const caseNumber = historyCase.convertedToSuspectCaseNumber || historyCase.convertedToPositiveCaseNumber;
        console.log('onCaseNumber', caseNumber);
        this.caseNumber.emit(caseNumber);
    }

}
