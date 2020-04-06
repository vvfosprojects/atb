import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SuspectCaseInterface } from '../../../../shared/interface/suspect-case.interface';
import { CounterInterface } from '../../../../shared/interface/counters.interface';
import { calcCounters } from '../../../../shared/functions/_counters';

@Component({
    selector: 'app-suspect-data-table',
    templateUrl: './suspect-data-table.component.html',
    styleUrls: ['./suspect-data-table.component.scss']
})
export class SuspectDataTableComponent implements OnChanges {

    @Input() suspectList: SuspectCaseInterface[];
    @Input() loading: boolean;

    @Output() detail: EventEmitter<number> = new EventEmitter<number>();

    counter: CounterInterface;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.suspectList && changes.suspectList.currentValue) {
            const suspectList: SuspectCaseInterface[] = changes.suspectList.currentValue;
            if (suspectList) {
                this.counter = calcCounters(suspectList);
            }
        }
    }

    goToDetail(caseNumber: number) {
        this.detail.emit(caseNumber);
    }

}
