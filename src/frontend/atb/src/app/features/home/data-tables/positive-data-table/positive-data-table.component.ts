import { Component, Input, OnInit } from '@angular/core';
import { PositiveCaseInterface } from '../../../../shared/interface/positive-case.interface';

@Component({
    selector: 'app-positive-data-table',
    templateUrl: './positive-data-table.component.html',
    styleUrls: ['./positive-data-table.component.scss']
})
export class PositiveDataTableComponent implements OnInit {

    @Input() positiveList: PositiveCaseInterface[];
    @Input() loading: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

    goToDetail(caseNumber: number) {
        return;
    }
}
