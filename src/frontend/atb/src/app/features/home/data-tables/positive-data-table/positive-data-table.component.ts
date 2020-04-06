import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PositiveCaseInterface } from '../../../../shared/interface/positive-case.interface';
import { CounterInterface } from '../../../../shared/interface/counters.interface';
import { calcCounters } from '../../../../shared/functions/_counters';

@Component({
    selector: 'app-positive-data-table',
    templateUrl: './positive-data-table.component.html',
    styleUrls: ['./positive-data-table.component.scss']
})
export class PositiveDataTableComponent implements OnChanges {

    @Input() positiveList: PositiveCaseInterface[];
    @Input() loading: boolean;

    @Output() detail: EventEmitter<number> = new EventEmitter<number>();

    counter: CounterInterface;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.positiveList && changes.positiveList.currentValue) {
            const positiveList: PositiveCaseInterface[] = changes.positiveList.currentValue;
            if (positiveList) {
                this.counter = calcCounters(positiveList);
            }
        }
    }

    goToDetail(caseNumber: number) {
        this.detail.emit(caseNumber);
    }
}
