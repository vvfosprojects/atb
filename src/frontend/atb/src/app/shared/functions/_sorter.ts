import { SuspectCaseInterface } from '../interface/suspect/suspect-case.interface';
import { PositiveCaseInterface } from '../interface/positive/positive-case.interface';
import { RssInterface } from '../interface/rss.interface';
import { QuarantineGroupFacetInterface } from '../interface/quarantine-group-facet.interface';

export function globalSorter(a: SuspectCaseInterface | PositiveCaseInterface, b: SuspectCaseInterface | PositiveCaseInterface) {
    const d = { HOME: 2, HOSP: 1, INTCARE: 0 };

    if (d[a.data.quarantinePlace] > d[b.data.quarantinePlace]) return 1;
    if (d[a.data.quarantinePlace] < d[b.data.quarantinePlace]) return -1;

    if (a.subject.number < b.subject.number) return 1;
    if (a.subject.number > b.subject.number) return -1;

    return 0;
}

export function rssSorter(a: RssInterface, b: RssInterface) {

    if (a.order < b.order) return 1;
    if (a.order > b.order) return -1;

    return 0;
}

export function quarantineSorter(a: QuarantineGroupFacetInterface, b: QuarantineGroupFacetInterface) {
    if (a.total < b.total) return 1;
    if (a.total > b.total) return -1;

    return 0;
}

export function roleSorter(a: any, b: any) {
    if (a.value < b.value) return 1;
    if (a.value > b.value) return -1;

    return 0;
}
