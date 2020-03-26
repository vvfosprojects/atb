import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PositiveCaseInterface } from '../../../../shared/interface/positive-case.interface';

@Component({
    selector: 'app-positive-data-table',
    templateUrl: './positive-data-table.component.html',
    styleUrls: ['./positive-data-table.component.scss']
})
export class PositiveDataTableComponent implements OnInit {

    @Input() positiveList: PositiveCaseInterface[];
    @Input() loading: boolean;

    @Output() detail: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    goToDetail(caseNumber: number) {
        this.detail.emit(caseNumber);
    }
}
