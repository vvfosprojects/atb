import { Component, Input } from '@angular/core';
import { Series } from '../../../../../shared/interface/quarantine-group-facet.interface';

@Component({
    selector: 'app-horizontal-bar-charts',
    templateUrl: './horizontal-bar-charts.component.html',
    styleUrls: [ './horizontal-bar-charts.component.scss' ]
})
export class HorizontalBarChartsComponent {

    @Input() roleFacet: Series[];
    @Input() view: number[];

    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = false;
    showLegend: boolean = false;
    showXAxisLabel: boolean = true;
    yAxisLabel: string = 'Qualifica';
    showYAxisLabel: boolean = true;
    xAxisLabel: string = 'Numero di casi';

    colorScheme = {
        name: 'vivid'
    };

    constructor() {
    }

}
