import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-case-number-modal',
    templateUrl: './case-number-modal.component.html',
    styleUrls: ['./case-number-modal.component.scss']
})
export class CaseNumberModalComponent {

    title: string;
    caseNumber: number;
    detail: boolean;

    exMsg: string;

    constructor(private modal: NgbActiveModal) {
    }

    close() {
        this.modal.close('closed');
    }

    onDetail() {
        this.modal.close('onDetail');
    }
}
