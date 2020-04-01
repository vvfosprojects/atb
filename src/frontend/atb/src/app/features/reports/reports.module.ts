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
import { HorizontalBarChartsComponent } from './statistics/statistic-group/horizontal-bar-charts/horizontal-bar-charts.component';
import { StatisticComponent } from './statistics/statistic/statistic.component';
import { StackedHorizontalBarChartComponent } from './statistics/statistic/stacked-horizontal-bar-chart/stacked-horizontal-bar-chart.component';

@NgModule({
    declarations: [ StatisticsComponent, GroupStatisticComponent, HorizontalBarChartsComponent, StatisticComponent, StackedHorizontalBarChartComponent ],
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
