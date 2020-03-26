import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [ StatisticsComponent ],
    imports: [
        CommonModule,
        ReportsRoutingModule,
        SharedModule
    ]
})
export class ReportsModule {
}
