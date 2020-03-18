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
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    declarations: [
        AppComponent,
        FormPositivoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxsModule.forRoot(
            [LoadingState, FormPositivoState],
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
