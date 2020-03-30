import { Component, Input } from '@angular/core';
import { QuarantineGroupFacetInterface } from '../../../../../shared/interface/quarantine-group-facet.interface';

@Component({
    selector: 'app-stacked-horizontal-bar-chart',
    templateUrl: './stacked-horizontal-bar-chart.component.html',
    styleUrls: [ './stacked-horizontal-bar-chart.component.scss' ]
})
export class StackedHorizontalBarChartComponent {

    @Input() quarantineFacet: QuarantineGroupFacetInterface[];

    view: any[] = [ 500, 500 ];

    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = false;
    showLegend: boolean = false;
    showXAxisLabel: boolean = true;
    @Input() yAxisLabel: string = 'Gruppi';
    showYAxisLabel: boolean = true;
    @Input() xAxisLabel: string = 'Tipo ospedalizzazione';

    colorScheme = {
        domain: [ '#5AA454', '#C7B42C', '#aa2623' ]
    };

    constructor() {
    }

}
