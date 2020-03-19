import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LocationButtonComponent } from './components/location-button/location-button.component';

const COMPONENTS = [ ErrorPageComponent, LocationButtonComponent ];

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
