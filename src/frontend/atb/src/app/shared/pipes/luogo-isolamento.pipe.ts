import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'luogoIsolamento'
})
export class LuogoIsolamentoPipe implements PipeTransform {

    constructor() {
    }

    transform(luogoIsolamento: string, args?: any): any {
        return getLuogoIsolamento(luogoIsolamento);

        function getLuogoIsolamento(type: string) {
            let luogoIsolamentoReturn = '';
            switch (type) {
                case 'INTCARE':
                    luogoIsolamentoReturn = 'Terapia Intensiva';
                    break;
                case 'HOSP':
                    luogoIsolamentoReturn = 'Struttura Ospedaliera';
                    break;
                case 'HOME':
                    luogoIsolamentoReturn = 'Domicilio';
                    break;
            }
            return luogoIsolamentoReturn;
        }
    }

}
