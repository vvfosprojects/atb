import { NgModule } from '@angular/core';
import { CheckPermissionPipe } from './check-permission.pipe';
import { LuogoIsolamentoPipe } from './luogo-isolamento.pipe';
import { OpenConvertCasePipe } from './open-convert-case.pipe';
import { SavesSpinnerPipe } from './saves-spinner.pipe';

const COMPONENTS = [ CheckPermissionPipe, LuogoIsolamentoPipe, OpenConvertCasePipe, SavesSpinnerPipe ];

@NgModule({
    imports: [],
    declarations: [ ...COMPONENTS ],
    exports: [ ...COMPONENTS ],
})

export class PipeModule {
}
