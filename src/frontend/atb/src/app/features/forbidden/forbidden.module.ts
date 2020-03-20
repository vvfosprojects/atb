import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
    template: `
        <app-error-page title="ACCESSO NON AUTORIZZATO"
                        text="Non sei autorizzato ad accedere a questa pagina">
            <button class="btn btn-lg btn-block btn-primary" (click)="onHome()">
                <i class="fa fa-refresh mr-1"></i>
                Riprova
            </button>
        </app-error-page>`,
})
export class ForbiddenComponent {

    constructor(private store: Store) {
    }

    onHome() {
        this.store.dispatch(new Navigate(['/']));
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
