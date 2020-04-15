import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'savesSpinner'
})
export class SavesSpinnerPipe implements PipeTransform {

    transform(value: boolean, font: string): string {

        let spinner = 'fa fa-spin fa-spinner';

        return value ? spinner : `fa ${font}`;

    }

}
