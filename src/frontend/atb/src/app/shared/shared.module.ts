import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [];

const MODULES = [
    FormsModule,
    ReactiveFormsModule,
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [ ...COMPONENTS, ...MODULES ]
})
export class SharedModule {
}
