import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SearchComponent } from './search/search.component';
import { SharedModule } from '../../shared/shared.module';
import { SearchPositivoComponent } from './search/search-positivo/search-positivo.component';
import { FormPositivoComponent } from './form-positivo/form-positivo.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchAssenteComponent } from './search/search-assente/search-assente.component';
import { FormAssenteComponent } from './form-assente/form-assente.component';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@NgModule({
    declarations: [SearchComponent, FormPositivoComponent, FormAssenteComponent, SearchPositivoComponent, SearchAssenteComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        NgbDatepickerModule,
        NgSelectModule,
        NgxsFormPluginModule
    ]
})
export class HomeModule {
}
