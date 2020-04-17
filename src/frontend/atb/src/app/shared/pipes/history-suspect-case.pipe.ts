import { Pipe, PipeTransform } from '@angular/core';
import { SuspectHistoryInterface } from '../interface/suspect';
import { actionOnConvertedSuspect } from '../functions';

@Pipe({
    name: 'historySuspectCase'
})
export class HistorySuspectCasePipe implements PipeTransform {

    constructor() {
    }

    transform(historyCase: SuspectHistoryInterface, ...args: unknown[]): string {

        const historyCases: SuspectHistoryInterface[] = [ ...args[0] as [] ];
        const index = args[1] as number;

        return getClass();

        function getClass() {
            const cssClass = 'list-group-item-action cursor-pointer';
            return actionOnConvertedSuspect(historyCase, historyCases, index) ? cssClass : '';
        }
    }

}
