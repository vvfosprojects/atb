import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Store } from '@ngxs/store';

@Component({
    template: `
        <app-error-page title="ACCESSO NON AUTORIZZATO"
                        text="Non sei autorizzato ad accedere a questa pagina">
        </app-error-page>`,
})
export class ForbiddenComponent {

    constructor(private store: Store) {
    }

}

const routes: Routes = [
    {
        path: '',
        component: ForbiddenComponent
    }
];

@NgModule({
    declarations: [ ForbiddenComponent ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class ForbiddenModule {
}
