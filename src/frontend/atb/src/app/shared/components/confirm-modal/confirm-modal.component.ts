import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

    title: string;
    message: string;

    constructor(private modal: NgbActiveModal) {
    }

    modalClose(message: string) {
        this.modal.close(message);
    }

}
