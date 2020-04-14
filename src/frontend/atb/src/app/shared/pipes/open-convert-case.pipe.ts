import { Pipe, PipeTransform } from '@angular/core';
import { openSuspect } from '../functions';

@Pipe({
    name: 'openConvertCase'
})
export class OpenConvertCasePipe implements PipeTransform {

    constructor() {
    }

    transform(historyCase: any, args?: any): any {
        return args ? getClass() : getBoolean();

        function getBoolean() {
            return openSuspect(historyCase);
        }

        function getClass() {
            const cssClass = 'list-group-item-action cursor-pointer';
            return getBoolean() ? cssClass : '';
        }
    }

}
