import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingState } from './shared/store/loading/loading.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthState } from './features/auth/store/auth.state';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor, LoaderInterceptor } from './core/interceptors';
import { NavbarComponent } from './features/navbar/navbar.component';
import { FooterComponent } from './features/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';
import localeIT from '@angular/common/locales/it';
import { PipeModule } from './shared/pipes/pipe.module';
import { PermessiState } from './shared/store/permessi/permessi.state';
import { RssState } from './features/home/store/rss.state';

registerLocaleData(localeIT);


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxsModule.forRoot(
            [ LoadingState, AuthState, PermessiState, RssState ],
            { developmentMode: !environment.production }
        ),
        NgxsRouterPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot({
            name: '#ATB - NGXS',
            disabled: environment.production,
        }),
        NgxsFormPluginModule.forRoot(),
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-bottom-center',
            maxOpened: 2
        }),
        ReactiveFormsModule,
        NgSelectModule,
        NgbDatepickerModule,
        HttpClientModule,
        NgbDropdownModule,
        PipeModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'it-IT' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
