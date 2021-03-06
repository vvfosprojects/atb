import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-keep-alive-card',
    templateUrl: './keep-alive-card.component.html',
    styleUrls: [ './keep-alive-card.component.scss' ]
})
export class KeepAliveCardComponent {

    @Output() keepAliveButton = new EventEmitter();


}
