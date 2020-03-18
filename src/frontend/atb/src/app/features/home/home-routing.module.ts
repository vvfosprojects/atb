import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';

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
        // component: PositivoComponent
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