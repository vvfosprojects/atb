import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-keep-alive-modal',
  templateUrl: './keep-alive-modal.component.html',
  styleUrls: ['./keep-alive-modal.component.scss']
})
export class KeepAliveModalComponent {

    constructor(private modal: NgbActiveModal) {
    }

    modalClose(message: string) {
        this.modal.close(message);
    }

}
