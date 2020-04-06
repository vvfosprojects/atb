import { CounterInterface } from '../interface/counters.interface';
import { PositiveCaseInterface } from '../interface/positive-case.interface';
import { SuspectCaseInterface } from '../interface/suspect-case.interface';

export function calcCounters(listCase: PositiveCaseInterface[] | SuspectCaseInterface[]): CounterInterface {
    let closed = 0;
    let open = 0;
    for (let item of listCase) {
        item.data.actualWorkReturnDate || item.data.dateOfDeath ? closed++ : open++
    }
    return { closed, open }
}
