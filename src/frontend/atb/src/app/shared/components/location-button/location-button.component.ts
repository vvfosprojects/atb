import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-location-button',
    template: `
        <button class="btn btn-lg btn-block btn-primary" (click)="onBack()">
            <i class="fa fa-arrow-left mr-1"></i>
            Torna indietro e riprova
        </button>`,
})
export class LocationButtonComponent {

    constructor(private _location: Location) {
    }

    onBack() {
        this._location.back();
    }

}
