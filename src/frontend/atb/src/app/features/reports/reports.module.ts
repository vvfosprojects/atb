import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { SharedModule } from '../../shared/shared.module';
import { StatisticsService } from '../../core/services/statistics/statistics.service';
import { NgxsModule } from '@ngxs/store';
import { StatisticsState } from './store/statistics.state';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GroupStatisticComponent } from './statistics/statistic-group/group-statistic.component';
import { GroupCaseComponent } from './statistics/group-case/group-case.component';

@NgModule({
    declarations: [ StatisticsComponent, GroupStatisticComponent, GroupCaseComponent ],
    imports: [
        CommonModule,
        ReportsRoutingModule,
        SharedModule,
        NgxsModule.forFeature([ StatisticsState ]),
        NgxChartsModule
    ],
    providers: [ StatisticsService ]
})
export class ReportsModule {
}
