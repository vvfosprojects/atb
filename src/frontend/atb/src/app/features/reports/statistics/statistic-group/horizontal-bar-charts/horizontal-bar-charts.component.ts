import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RoleFacet } from '../../../../../shared/interface/statistics.interface';

@Component({
    selector: 'app-horizontal-bar-charts',
    templateUrl: './horizontal-bar-charts.component.html',
    styleUrls: [ './horizontal-bar-charts.component.scss' ]
})
export class HorizontalBarChartsComponent implements OnChanges {

    @Input() roleFacet: RoleFacet[];

    data: any[];
    view: any[] = [500, 1000];

    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = false;
    showLegend: boolean = false;
    showXAxisLabel: boolean = true;
    yAxisLabel: string = 'Qualifica';
    showYAxisLabel: boolean = true;
    xAxisLabel: string = 'Numero di casi';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };


    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.roleFacet && changes.roleFacet.currentValue) {
            const facet: RoleFacet[] = changes.roleFacet.currentValue;
            if (facet) {
                this.data = facet.map(value => {
                    return {
                        name: value.name,
                        value: value.total,
                    };
                });
            }
        }
    }

}
