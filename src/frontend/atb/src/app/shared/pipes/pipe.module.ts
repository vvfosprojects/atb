import { NgModule } from '@angular/core';
import { CheckPermissionPipe } from './check-permission.pipe';
import { LuogoIsolamentoPipe } from './luogo-isolamento.pipe';
import { HistoryPositiveCasePipe } from './history-positive-case.pipe';
import { HistorySuspectCasePipe } from './history-suspect-case.pipe';
import { SavesSpinnerPipe } from './saves-spinner.pipe';

const COMPONENTS = [
    CheckPermissionPipe,
    LuogoIsolamentoPipe,
    HistoryPositiveCasePipe,
    HistorySuspectCasePipe,
    SavesSpinnerPipe
];

@NgModule({
    imports: [],
    declarations: [ ...COMPONENTS ],
    exports: [ ...COMPONENTS ],
})

export class PipeModule {
}
