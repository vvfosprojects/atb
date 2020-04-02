import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LocationButtonComponent } from './components/location-button/location-button.component';
import { CaseNumberModalComponent } from './components/case-number-modal/case-number-modal.component';
import { PipeModule } from './pipes/pipe.module';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { CounterComponent } from './components/counter/counter.component';
import { GroupCaseComponent } from './components/group-case/group-case.component';
import { HistoryCaseComponent } from './components/history-case/history-case.component';
import { NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { KeepAliveCardComponent } from './components/keep-alive-card/keep-alive-card.component';

const COMPONENTS = [
    ErrorPageComponent,
    LocationButtonComponent,
    CaseNumberModalComponent,
    NewsCardComponent,
    CounterComponent,
    GroupCaseComponent,
    HistoryCaseComponent,
    KeepAliveCardComponent
];

const MODULES = [
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    NgbTabsetModule,
    NgbTooltipModule
];

@NgModule({
    declarations: [ ...COMPONENTS ],
    imports: [
        CommonModule,
        PipeModule
    ],
    exports: [ ...COMPONENTS, ...MODULES ]
})
export class SharedModule {
}
