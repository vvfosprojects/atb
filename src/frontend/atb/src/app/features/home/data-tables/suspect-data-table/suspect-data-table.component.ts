import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SuspectCaseInterface } from '../../../../shared/interface/suspect-case.interface';

@Component({
    selector: 'app-suspect-data-table',
    templateUrl: './suspect-data-table.component.html',
    styleUrls: ['./suspect-data-table.component.scss']
})
export class SuspectDataTableComponent implements OnInit {

    @Input() suspectList: SuspectCaseInterface[];
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
