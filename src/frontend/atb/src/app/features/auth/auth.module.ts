import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { AuthenticationFakeService, AuthenticationService } from '../../core/services/auth';
import { environment } from '../../../environments/environment';
import { LoginState } from './store/login.state';
import { NgxsModule } from '@ngxs/store';


@NgModule({
    declarations: [ LoginComponent, LogoutComponent, ResetPasswordComponent ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        NgxsModule.forFeature([ LoginState ]),
        NgxsFormPluginModule
    ],
    providers: [
        {
            provide: AuthenticationService,
            useClass: environment.production ? AuthenticationService : AuthenticationFakeService
        }
    ]
})
export class AuthModule {
}
