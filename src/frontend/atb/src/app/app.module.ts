import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { FormPositivoComponent } from './features/home/form-positivo/form-positivo.component';
import { FormPositivoState } from './features/home/form-positivo/store/form-positivo.state';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingState } from './shared/store/loading/loading.state';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthState } from './features/auth/store/auth.state';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { QualificheState } from './shared/store/qualifiche/qualifiche.state';
import { SearchState } from "./features/home/search/store/search.state";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxsModule.forRoot(
            [LoadingState, AuthState, QualificheState, FormPositivoState, SearchState],
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
        NgbDatepickerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
