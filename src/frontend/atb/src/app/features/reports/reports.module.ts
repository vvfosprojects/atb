import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
    declarations: [ StatisticsComponent ],
    imports: [
        CommonModule,
        ReportsRoutingModule
    ]
})
export class ReportsModule {
}
