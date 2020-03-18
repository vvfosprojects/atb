import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FormPositivoComponent } from "./form-positivo/form-positivo.component";

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
        path: 'form-assente',
        // component: AssenteComponent
    },
    {
        path: 'report',
        // component: ReportComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule {
}
