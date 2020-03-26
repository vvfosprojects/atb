import { SuspectCaseInterface } from '../interface/suspect-case.interface';
import { PositiveCaseInterface } from '../interface/positive-case.interface';

export function globalSorter(a: SuspectCaseInterface | PositiveCaseInterface, b: SuspectCaseInterface | PositiveCaseInterface) {
    let d = { HOME: 2, HOSP: 1, INTCARE: 0 };

    if (a.data.quarantinePlace != b.data.quarantinePlace) {
        if (d[a.data.quarantinePlace] > d[b.data.quarantinePlace])
            return 1;
        else if (d[a.data.quarantinePlace] < d[b.data.quarantinePlace])
            return -1;
        return 0;
    } else {
        if (a.subject.number < b.subject.number)
            return 1;
        else if (a.subject.number > b.subject.number)
            return -1;
        else return 0;
    }
}
