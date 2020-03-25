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
import { AssentiService } from '../../core/services/assenti/assenti.service';
import { PositiviService } from '../../core/services/positivi/positivi.service';
import { NgxsModule } from '@ngxs/store';
import { QualificheState } from '../../shared/store/qualifiche/qualifiche.state';
import { FormPositivoState } from './store/form-positivo.state';
import { FormAssenteState } from './store/form-assente.state';
import { SearchState } from './store/search.state';
import { DataTablesComponent } from './data-tables/data-tables.component';
import { PermessiState } from '../../shared/store/permessi/permessi.state';
import { DataTablesService } from '../../core/services/data-tables/data-tables.service';
import { DataTablesState } from './store/data-tables.state';

@NgModule({
    declarations: [ SearchComponent, FormPositivoComponent, FormAssenteComponent, SearchPositivoComponent, SearchAssenteComponent, DataTablesComponent ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        NgbDatepickerModule,
        NgSelectModule,
        NgxsFormPluginModule,
        NgxsModule.forFeature([
            PermessiState,
            QualificheState,
            FormPositivoState,
            FormAssenteState,
            SearchState,
            DataTablesState
        ])
    ],
    providers: [
        AssentiService,
        PositiviService,
        DataTablesService
    ]
})
export class HomeModule {
}
