import { Pipe, PipeTransform } from '@angular/core';
import { PositiveHistoryInterface } from '../interface/positive';
import { closedConvertedPositiveCase, convertedPositiveCase } from '../functions';

@Pipe({
    name: 'historyPositiveCase'
})
export class HistoryPositiveCasePipe implements PipeTransform {

    constructor() {
    }

    transform(historyCase: PositiveHistoryInterface, args?: any): any {
        return getClass();

        function getBoolean() {
            return convertedPositiveCase(historyCase) && closedConvertedPositiveCase(historyCase);
        }

        function getClass() {
            const cssClass = 'list-group-item-action cursor-pointer';
            return getBoolean() ? cssClass : '';
        }
    }

}
