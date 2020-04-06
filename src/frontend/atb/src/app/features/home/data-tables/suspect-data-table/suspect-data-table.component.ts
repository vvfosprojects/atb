import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuspectCaseInterface } from '../../../../shared/interface/suspect-case.interface';
import { CounterInterface } from '../../../../shared/interface/counters.interface';

@Component({
    selector: 'app-suspect-data-table',
    templateUrl: './suspect-data-table.component.html',
    styleUrls: ['./suspect-data-table.component.scss']
})
export class SuspectDataTableComponent {

    @Input() suspectList: SuspectCaseInterface[];
    @Input() loading: boolean;
    @Input() counter: CounterInterface;

    @Output() detail: EventEmitter<number> = new EventEmitter<number>();

    goToDetail(caseNumber: number) {
        this.detail.emit(caseNumber);
    }

}
