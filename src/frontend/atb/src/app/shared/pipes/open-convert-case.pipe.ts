import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'openConvertCase'
})
export class OpenConvertCasePipe implements PipeTransform {

    constructor() {
    }

    transform(historyCase: any, args?: any): any {
        return args ? getClass() : getBoolean();

        function getBoolean() {
            if (historyCase.convertedToSuspectCaseNumber && !historyCase.convertedToSuspectSheetClosed || historyCase.convertedToPositiveCaseNumber && !historyCase.convertedToPositiveSheetClosed) {
                return true;
            }
        }

        function getClass() {
            const cssClass = 'list-group-item-action cursor-pointer';
            return getBoolean() ? cssClass : '';
        }
    }

}
