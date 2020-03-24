import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-case-number-modal',
    templateUrl: './case-number-modal.component.html',
    styleUrls: ['./case-number-modal.component.scss']
})
export class CaseNumberModalComponent implements OnInit {

    title: string;
    caseNumber: number;

    constructor(private modal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }

    close() {
        this.modal.close();
    }
}
