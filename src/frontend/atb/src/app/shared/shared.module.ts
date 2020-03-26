import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LocationButtonComponent } from './components/location-button/location-button.component';
import { CaseNumberModalComponent } from './components/case-number-modal/case-number-modal.component';
import { PipeModule } from './pipes/pipe.module';
import { NewsCardComponent } from './components/news-card/news-card.component';

const COMPONENTS = [ ErrorPageComponent, LocationButtonComponent, CaseNumberModalComponent, NewsCardComponent ];

const MODULES = [
    FormsModule,
    ReactiveFormsModule,
    PipeModule
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
