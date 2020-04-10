import { NgModule } from '@angular/core';
import { CheckPermissionPipe } from './check-permission.pipe';
import { LuogoIsolamentoPipe } from './luogo-isolamento.pipe';
import { OpenConvertCasePipe } from './open-convert-case.pipe';

const COMPONENTS = [CheckPermissionPipe, LuogoIsolamentoPipe, OpenConvertCasePipe];

@NgModule({
    imports: [],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}
