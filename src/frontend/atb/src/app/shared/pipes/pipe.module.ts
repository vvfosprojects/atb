import { NgModule } from '@angular/core';
import { CheckPermissionPipe } from './check-permission.pipe';

const COMPONENTS = [CheckPermissionPipe];

@NgModule({
    imports: [],
    declarations: [...COMPONENTS, CheckPermissionPipe],
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
