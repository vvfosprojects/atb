import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FormPositivoComponent } from './form-positivo/form-positivo.component';
import { FormAssenteComponent } from './form-assente/form-assente.component';
import { DataTablesComponent } from './data-tables/data-tables.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Roles } from '../../shared/enum/roles.enum';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'ricerca',
        pathMatch: 'full'
    },
    {
        path: 'ricerca',
        component: SearchComponent,
        canActivate: [ AuthGuard ],
        data: { roles: [ Roles.Doctor ] }
    },
    {
        path: 'form-positivo',
        component: FormPositivoComponent,
        canActivate: [ AuthGuard ],
        data: { roles: [ Roles.Doctor ] }
    },
    {
        path: 'form-positivo/:id',
        component: FormPositivoComponent,
        canActivate: [ AuthGuard ],
        data: { roles: [ Roles.Doctor ] }
    },
    {
        path: 'form-positivo/detail/:id',
        component: FormPositivoComponent,
        canActivate: [ AuthGuard ],
        data: { roles: [ Roles.Doctor, Roles.Supervisor ] }
    },
    {
        path: 'form-assente',
        component: FormAssenteComponent,
        canActivate: [ AuthGuard ],
        data: { roles: [ Roles.Doctor ] }
    },
    {
        path: 'form-assente/:id',
        component: FormAssenteComponent,
        canActivate: [ AuthGuard ],
        data: { roles: [ Roles.Doctor ] }
    },
    {
        path: 'form-assente/detail/:id',
        component: FormAssenteComponent,
        canActivate: [ AuthGuard ],
        data: { roles: [ Roles.Doctor, Roles.Supervisor ] }
    },
    {
        path: 'data-tables',
        component: DataTablesComponent,
        canActivate: [ AuthGuard ],
        data: { roles: [ Roles.Doctor, Roles.Supervisor ] }
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule {
}
