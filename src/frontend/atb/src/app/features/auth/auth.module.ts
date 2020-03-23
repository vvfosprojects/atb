import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { AuthenticationService } from '../../core/services/auth';
import { NgxsModule } from '@ngxs/store';
import { LoginState } from './store/login.state';
import { ResetState } from './store/reset.state';


@NgModule({
    declarations: [ LoginComponent, LogoutComponent, ResetPasswordComponent ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        NgxsModule.forFeature([ LoginState, ResetState ]),
        NgxsFormPluginModule
    ],
    providers: [
        AuthenticationService
    ]
})
export class AuthModule {
}
