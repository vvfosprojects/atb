import { LSNAME } from '../../core/settings/config';

export function formatDate(data: any) {
    const year = data.year;
    const month = data.month.toString().length > 1 ? data.month : '0' + data.month;
    const day = data.day.toString().length > 1 ? data.day : '0' + data.day;
    return year + '-' + month + '-' + day + 'T12:00:00Z';
}

export function formatDateForNgbDatePicker(data: any) {
    const year = +data.substr(0, 4);
    const month = +data.substr(5, 2);
    const day = +data.substr(8, 2);
    return { year, month, day };
}

export function detailArgs(action, userGroup) {
    let caseNumber: number;
    let group: string;
    if (action.bookmark) {
        const splittedArgs = action.caseNumber.split(LSNAME.detailDelimiter);
        group = splittedArgs[0];
        caseNumber = +splittedArgs[1];
    } else {
        caseNumber = +action.caseNumber;
        group = userGroup;
    }
    return { caseNumber, group }
}

export function splitGroup(caseGroupNumber: string) {
    const splittedArgs = caseGroupNumber.split(LSNAME.detailDelimiter);
    return splittedArgs[0];
}
