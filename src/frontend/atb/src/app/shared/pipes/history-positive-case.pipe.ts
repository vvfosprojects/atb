import { Pipe, PipeTransform } from '@angular/core';
import { PositiveHistoryInterface } from '../interface/positive';
import { actionOnConvertedPositive } from '../functions';

@Pipe({
    name: 'historyPositiveCase'
})
export class HistoryPositiveCasePipe implements PipeTransform {

    constructor() {
    }

    transform(historyCase: PositiveHistoryInterface, ...args: unknown[]): string {

        const historyCases: PositiveHistoryInterface[] = [ ...args[0] as [] ];
        const index = args[1] as number;

        return getClass();

        function getClass() {
            const cssClass = 'list-group-item-action cursor-pointer';
            return actionOnConvertedPositive(historyCase, historyCases, index) ? cssClass : '';
        }
    }

}
