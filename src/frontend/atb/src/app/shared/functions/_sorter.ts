import { SuspectCaseInterface } from '../interface/suspect-case.interface';
import { PositiveCaseInterface } from '../interface/positive-case.interface';
import { RssInterface } from '../interface/rss.interface';

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
