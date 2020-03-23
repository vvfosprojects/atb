import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Roles } from './shared/enum/roles.enum';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: '404',
        loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule)
    },
    {
        path: 'welcome',
        loadChildren: () => import('./features/welcome/welcome.module').then(m => m.WelcomeModule),
        canActivate: [ AuthGuard ]
    },
    {
        path: 'forbidden',
        loadChildren: () => import('./features/forbidden/forbidden.module').then(m => m.ForbiddenModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
        canActivate: [ AuthGuard ],
        data: { roles: [ Roles.Doctor ] }
    },
    {
        path: 'reports',
        loadChildren: () => import('./features/reports/reports.module').then(m => m.ReportsModule),
        canActivate: [ AuthGuard ],
        data: { roles: [ Roles.Manager, Roles.Doctor ] }
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'login',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'logout',
        redirectTo: 'auth/logout',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '404',
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}
