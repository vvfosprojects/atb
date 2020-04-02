import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'luogoIsolamento'
})
export class LuogoIsolamentoPipe implements PipeTransform {

    constructor() {
    }

    transform(luogoIsolamento: string, args?: any): any {
        return args ? getLuogoIsolamentoClass(luogoIsolamento) : getLuogoIsolamento(luogoIsolamento);

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

        function getLuogoIsolamentoClass(type: string) {
            let luogoIsolamentoReturn = '';
            switch (type) {
                case 'INTCARE':
                    luogoIsolamentoReturn = 'text-danger fa fa-ambulance px-1';
                    break;
                case 'HOSP':
                    luogoIsolamentoReturn = 'text-warning fa fa-ambulance px-1';
                    break;
                case 'HOME':
                    luogoIsolamentoReturn = 'text-info fa fa-home px-1';
                    break;
            }
            return luogoIsolamentoReturn;
        }
    }

}
