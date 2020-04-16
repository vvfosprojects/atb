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
import { NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { KeepAliveCardComponent } from './components/keep-alive-card/keep-alive-card.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { HistorySuspectCaseComponent } from './components/history-suspect-case/history-suspect-case.component';
import { HistoryPositiveCaseComponent } from './components/history-positive-case/history-positive-case.component';

const COMPONENTS = [
    ErrorPageComponent,
    LocationButtonComponent,
    CaseNumberModalComponent,
    NewsCardComponent,
    CounterComponent,
    GroupCaseComponent,
    KeepAliveCardComponent,
    ConfirmModalComponent,
    HistorySuspectCaseComponent,
    HistoryPositiveCaseComponent
];

const MODULES = [
    FormsModule,
    ReactiveFormsModule,
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
