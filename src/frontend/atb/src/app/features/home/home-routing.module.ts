import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FormPositivoComponent } from './form-positivo/form-positivo.component';
import { FormAssenteComponent } from './form-assente/form-assente.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'ricerca',
        pathMatch: 'full'
    },
    {
        path: 'ricerca',
        component: SearchComponent
    },
    {
        path: 'form-positivo',
        component: FormPositivoComponent
    },
    {
        path: 'form-positivo/:id',
        component: FormPositivoComponent
    },
    {
        path: 'form-assente',
        component: FormAssenteComponent
    },
    {
        path: 'form-assente/:id',
        component: FormAssenteComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule {
}
