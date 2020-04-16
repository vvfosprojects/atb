import { Pipe, PipeTransform } from '@angular/core';
import { SuspectHistoryInterface } from '../interface/suspect';
import { closedConvertedSuspectCase, convertedSuspectCase } from '../functions';

@Pipe({
    name: 'historySuspectCase'
})
export class HistorySuspectCasePipe implements PipeTransform {

    constructor() {
    }

    transform(historyCase: SuspectHistoryInterface, args?: any): any {
        return getClass();

        function getBoolean() {
            return convertedSuspectCase(historyCase) && closedConvertedSuspectCase(historyCase);
        }

        function getClass() {
            const cssClass = 'list-group-item-action cursor-pointer';
            return getBoolean() ? cssClass : '';
        }
    }

}
