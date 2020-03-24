import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LocationButtonComponent } from './components/location-button/location-button.component';
import { CaseNumberModalComponent } from './components/case-number-modal/case-number-modal.component';

const COMPONENTS = [ ErrorPageComponent, LocationButtonComponent, CaseNumberModalComponent ];

const MODULES = [
    FormsModule,
    ReactiveFormsModule,
];

@NgModule({
    declarations: [ ...COMPONENTS ],
    imports: [
        CommonModule
    ],
    exports: [ ...COMPONENTS, ...MODULES ]
})
export class SharedModule {
}
