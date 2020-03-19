export function formatDate(data: any) {
    const year = data.year;
    const month = data.month.toString().length > 1 ? data.month : '0' + data.month;
    const day = data.day.toString().length > 1 ? data.day : '0' + data.day;
    return year + '-' + month + '-' + day;
}