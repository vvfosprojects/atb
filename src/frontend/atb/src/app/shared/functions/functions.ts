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

export function getLuogoIsolamento(type: string) {
    let luogoIsolamento = '';
    switch (type) {
        case 'INTCARE':
            luogoIsolamento = 'Terapia Intensiva';
            break;
        case 'HOSP':
            luogoIsolamento = 'Struttura Ospedaliera';
            break;
        case 'HOUSE':
            luogoIsolamento = 'Domicilio';
            break;
    }
    return luogoIsolamento;
}
