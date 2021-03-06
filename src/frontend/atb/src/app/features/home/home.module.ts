import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SearchComponent } from './search/search.component';
import { SharedModule } from '../../shared/shared.module';
import { SearchPositivoComponent } from './search/search-positivo/search-positivo.component';
import { FormPositivoComponent } from './form-positivo/form-positivo.component';
import {
    NgbDateParserFormatter,
    NgbDatepickerModule
} from '@ng-bootstrap/ng-bootstrap';
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
import { DataTablesService } from '../../core/services/data-tables/data-tables.service';
import { DataTablesState } from './store/data-tables.state';
import { FiltersDataTablesComponent } from './data-tables/filters-data-tables/filters-data-tables.component';
import { PositiveDataTableComponent } from './data-tables/positive-data-table/positive-data-table.component';
import { SuspectDataTableComponent } from './data-tables/suspect-data-table/suspect-data-table.component';
import { CustomDateParserFormatter } from '../../core/adapters/custom-date-parser-formatter.service';
import { KeepAliveService } from '../../core/services/keep-alive/keep-alive.service';
import { ConvertCaseState } from './store/convert-case.state';
import { NavigationLinkState } from './store/navigation-link.state';

@NgModule({
    declarations: [
        SearchComponent,
        FormPositivoComponent,
        FormAssenteComponent,
        SearchPositivoComponent,
        SearchAssenteComponent,
        DataTablesComponent,
        FiltersDataTablesComponent,
        PositiveDataTableComponent,
        SuspectDataTableComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        NgbDatepickerModule,
        NgSelectModule,
        NgxsFormPluginModule,
        NgxsModule.forFeature([
            QualificheState,
            FormPositivoState,
            FormAssenteState,
            SearchState,
            DataTablesState,
            ConvertCaseState,
            NavigationLinkState
        ])
    ],
    providers: [
        AssentiService,
        PositiviService,
        DataTablesService,
        KeepAliveService,
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
    ]
})
export class HomeModule {
}
