import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { FormPositivoState } from './features/home/form-positivo/store/form-positivo.state';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingState } from './shared/store/loading/loading.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthState } from './features/auth/store/auth.state';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { QualificheState } from './shared/store/qualifiche/qualifiche.state';
import { SearchState } from './features/home/search/store/search.state';
import { FormAssenteState } from './features/home/form-assente/store/form-assente.state';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AssentiService } from './core/services/assenti/assenti.service';
import { ErrorInterceptor, JwtInterceptor, LoaderInterceptor } from './core/interceptors';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxsModule.forRoot(
            [ LoadingState, AuthState, QualificheState, FormPositivoState, FormAssenteState, SearchState ],
            { developmentMode: !environment.production }
        ),
        NgxsRouterPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot({
            name: '#ATB - NGXS',
            disabled: environment.production,
        }),
        NgxsFormPluginModule.forRoot(),
        ReactiveFormsModule,
        NgSelectModule,
        NgbDatepickerModule,
        HttpClientModule
    ],
    providers: [
        AssentiService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
