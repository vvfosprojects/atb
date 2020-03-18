import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    // {
    //     path: '404',
    //     loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule)
    // },
    // {
    //     path: '500',
    //     loadChildren: () => import('./features/wrong/wrong.module').then(m => m.WrongModule)
    // },
    // {
    //     path: 'forbidden',
    //     loadChildren: () => import('./features/forbidden/forbidden.module').then(m => m.ForbiddenModule)
    // },
    {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
        canActivate: [ AuthGuard ]
    },
    // {
    //     path: 'auth',
    //     loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
    // },
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
