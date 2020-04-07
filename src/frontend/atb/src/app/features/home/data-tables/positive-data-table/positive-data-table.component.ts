import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CounterInterface, PositiveCaseInterface } from '../../../../shared/interface';

@Component({
    selector: 'app-positive-data-table',
    templateUrl: './positive-data-table.component.html',
    styleUrls: ['./positive-data-table.component.scss']
})
export class PositiveDataTableComponent {

    @Input() positiveList: PositiveCaseInterface[];
    @Input() loading: boolean;
    @Input() counter: CounterInterface;

    @Output() detail: EventEmitter<number> = new EventEmitter<number>();

    goToDetail(caseNumber: number) {
        this.detail.emit(caseNumber);
    }
}
