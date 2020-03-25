import { Component, Input, OnInit } from '@angular/core';
import { SuspectCaseInterface } from '../../../../shared/interface/suspect-case.interface';

@Component({
    selector: 'app-suspect-data-table',
    templateUrl: './suspect-data-table.component.html',
    styleUrls: ['./suspect-data-table.component.scss']
})
export class SuspectDataTableComponent implements OnInit {

    @Input() suspectList: SuspectCaseInterface[];
    @Input() loading: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

    goToDetail(caseNumber: number) {
        return;
    }

}
