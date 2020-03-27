import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: [ './footer.component.scss' ]
})
export class FooterComponent {

    version: string;

    constructor() {
        this.version = environment.productionTest ? ' (test)' : '';
    }

}
