import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
    template: `
        <app-error-page title="PAGINA NON TROVATA" text="Questa pagina non esiste!">
            <app-location-button></app-location-button>
        </app-error-page>`,
})
export class NotFoundComponent {
}

const routes: Routes = [
    {
        path: '',
        component: NotFoundComponent
    }
];

@NgModule({
    declarations: [ NotFoundComponent ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class NotFoundModule {
}
