import { QuarantinePlacesFacet } from '../interface/statistics.interface';
import { Series } from '../interface/quarantine-group-facet.interface';

export function seriesPositive(quarantineFacet: QuarantinePlacesFacet): Series[] {
    const quarantineSeries: Series[] = [];
    quarantineSeries.push({ name: 'Domicilio', value: quarantineFacet.home });
    quarantineSeries.push({ name: 'Ospedale', value: quarantineFacet.hosp });
    quarantineSeries.push({ name: 'Terapia Intensiva', value: quarantineFacet.intCare });
    return quarantineSeries;
}

export function seriesSuspects(quarantineFacet: QuarantinePlacesFacet): Series[] {
    const quarantineSeries: Series[] = [];
    quarantineSeries.push({ name: 'Domicilio', value: quarantineFacet.home });
    // quarantineSeries.push({ name: 'Ospedale', value: quarantineFacet.hosp });
    return quarantineSeries;
}

export function countTotalSeries(series: Series[]): number {
    let count = 0;
    if (series && series.length > 0) {
        series.forEach( value => count += value.value);
    }
    return count;
}

export function chartsViewSize(itemNumber: number) : number[] {
    const minHeight = 80;
    const itemHeight = 20;
    const width = 500;

    return [width, (minHeight + deltaHeight(itemNumber) + (itemHeight*itemNumber))];

    function deltaHeight(itemN: number): number {
        const minDelta = 8;
        const adjustHeight = 50;

        if (itemN >= minDelta) {
            return adjustHeight * Math.floor(itemN / minDelta);
        } else {
            return 0;
        }
    }
}
