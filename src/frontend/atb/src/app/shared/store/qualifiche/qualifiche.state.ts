import { Selector, State} from '@ngxs/store';
import { Injectable } from '@angular/core';

export interface QualificheStateModel {
    qualifiche: string[];
}

export const qualificheStateDefaults: QualificheStateModel = {
    qualifiche: [
        "VIGILE DEL FUOCO",
		"VIGILE DEL FUOCO AIB",
        "VIGILE DEL FUOCO COORDINATORE AIB",
        "VIGILE DEL FUOCO COORDINATORE",
        "VIGILE DEL FUOCO ESPERTO AIB",
        "VIGILE DEL FUOCO ESPERTO",
        "VIGILE DEL FUOCO VOLONTARIO",
        "CAPO REPARTO",
        "CAPO REPARTO AIB",
        "CAPO REPARTO VOLONTARIO",
        "CAPO SQUADRA AIB",
        "CAPO SQUADRA ESPERTO AIB",
        "CAPO SQUADRA ESPERTO",
        "CAPO SQUADRA VOLONTARIO",
        "CAPO SQUADRA",
        "ALLIEVO VIGILE DEL FUOCO",
		"ASSISTENTE",
        "ATLETA",
        "DIRETTORE AGGIUNTO",
        "DIRETTORE AIB",
        "DIRETTORE COORDINATORE SPECIALE ANTINCENDI AIB",
        "DIRETTORE COORDINATORE SPECIALE INFORMATICO",
        "DIRETTORE COORDINATORE SPECIALE LOGISTICO-GESTIONALE",
        "DIRETTORE COORDINATORE SPECIALE",
        "DIRETTORE COORDINATORE",
        "DIRETTORE GINNICO-SPORTIVO",
        "DIRETTORE GINNICO-SPORTIVO-VICEDIRIGENTE",
        "DIRETTORE INFORMATICO",
        "DIRETTORE LOGISTICO-GESTIONALE",
        "DIRETTORE MEDICO-VICEDIRIGENTE",
        "DIRETTORE SANITARIO",
        "DIRETTORE SPECIALE ANTINCENDI AIB",
        "DIRETTORE SPECIALE INFORMATICO",
        "DIRETTORE SPECIALE LOGISTICO-GESTIONALE",
        "DIRETTORE SPECIALE",
        "DIRETTORE TECNICO-SCIENTIFICO",
        "DIRETTORE VICEDIRIGENTE AIB",
        "DIRETTORE VICEDIRIGENTE GINNICO-SPORTIVO",
        "DIRETTORE VICEDIRIGENTE INFORMATICO",
        "DIRETTORE VICEDIRIGENTE LOGISTICO-GESTIONALE",
        "DIRETTORE VICEDIRIGENTE SANITARIO",
        "DIRETTORE VICEDIRIGENTE TECNICO-SCIENTIFICO",
        "DIRETTORE VICEDIRIGENTE",
        "DIRETTORE",
        "DIRIGENTE GENERALE",
        "DIRIGENTE SUPERIORE AIB",
        "DIRIGENTE SUPERIORE GINNICO-SPORTIVO",
        "DIRIGENTE SUPERIORE MEDICO",
        "DIRIGENTE SUPERIORE SANITARIO",
        "DIRIGENTE SUPERIORE",
        "ELISOCCORRITORE CAPO REPARTO",
        "ELISOCCORRITORE CAPO SQUADRA ESPERTO",
        "ELISOCCORRITORE CAPO SQUADRA",
        "ELISOCCORRITORE DIRETTORE COORDINATORE SPECIALE",
        "ELISOCCORRITORE DIRETTORE SPECIALE",
        "ELISOCCORRITORE ISPETTORE COORDINATORE",
        "ELISOCCORRITORE ISPETTORE ESPERTO",
        "ELISOCCORRITORE ISPETTORE",
        "ELISOCCORRITORE VICE DIRETTORE SPECIALE",
        "ELISOCCORRITORE VIGILE DEL FUOCO COORDINATORE",
        "ELISOCCORRITORE VIGILE DEL FUOCO ESPERTO",
        "ELISOCCORRITORE VIGILE DEL FUOCO",
        "FUNZIONARIO TECNICO ANTINCENDI VOLONTARIO",
        "ISPETTORE ANTINCENDI AIB",
        "ISPETTORE ANTINCENDI COORDINATORE AIB",
        "ISPETTORE ANTINCENDI COORDINATORE",
        "ISPETTORE ANTINCENDI ESPERTO AIB",
        "ISPETTORE ANTINCENDI ESPERTO",
        "ISPETTORE ANTINCENDI",
        "ISPETTORE INFORMATICO COORDINATORE",
        "ISPETTORE INFORMATICO ESPERTO",
        "ISPETTORE INFORMATICO",
        "ISPETTORE LOGISTICO-GESTIONALE COORDINATORE",
        "ISPETTORE LOGISTICO-GESTIONALE ESPERTO",
        "ISPETTORE LOGISTICO-GESTIONALE",
        "ISPETTORE SANITARIO COORDINATORE",
        "ISPETTORE SANITARIO ESPERTO",
        "ISPETTORE SANITARIO",
        "ISPETTORE TECNICO-SCIENTIFICO COORDINATORE",
        "ISPETTORE TECNICO-SCIENTIFICO ESPERTO",
        "ISPETTORE TECNICO-SCIENTIFICO",
        "MAESTRO DIRETTORE",
        "NAUTICO DI COPERTA CAPO REPARTO",
        "NAUTICO DI COPERTA CAPO SQUADRA ESPERTO",
        "NAUTICO DI COPERTA CAPO SQUADRA",
        "NAUTICO DI COPERTA DIRETTORE COORDINATORE SPECIALE",
        "NAUTICO DI COPERTA DIRETTORE SPECIALE",
        "NAUTICO DI COPERTA ISPETTORE COORDINATORE",
        "NAUTICO DI COPERTA ISPETTORE ESPERTO",
        "NAUTICO DI COPERTA ISPETTORE",
        "NAUTICO DI COPERTA VICE DIRETTORE SPECIALE",
        "NAUTICO DI COPERTA VIGILE DEL FUOCO COORDINATORE",
        "NAUTICO DI COPERTA VIGILE DEL FUOCO ESPERTO",
        "NAUTICO DI COPERTA VIGILE DEL FUOCO",
        "NAUTICO DI MACCHINA CAPO REPARTO",
        "NAUTICO DI MACCHINA CAPO SQUADRA ESPERTO",
        "NAUTICO DI MACCHINA CAPO SQUADRA",
        "NAUTICO DI MACCHINA DIRETTORE COORDINATORE SPECIALE",
        "NAUTICO DI MACCHINA DIRETTORE SPECIALE",
        "NAUTICO DI MACCHINA ISPETTORE COORDINATORE",
        "NAUTICO DI MACCHINA ISPETTORE ESPERTO",
        "NAUTICO DI MACCHINA ISPETTORE",
        "NAUTICO DI MACCHINA VICE DIRETTORE SPECIALE",
        "NAUTICO DI MACCHINA VIGILE DEL FUOCO COORDINATORE",
        "NAUTICO DI MACCHINA VIGILE DEL FUOCO ESPERTO",
        "NAUTICO DI MACCHINA VIGILE DEL FUOCO",
        "OPERATORE ESPERTO",
        "OPERATORE",
        "ORCHESTRALE ESPERTO",
        "ORCHESTRALE SUPERIORE",
        "ORCHESTRALE",
        "PILOTA DI AEROMOBILE CAPO REPARTO",
        "PILOTA DI AEROMOBILE CAPO SQUADRA ESPERTO",
        "PILOTA DI AEROMOBILE CAPO SQUADRA",
        "PILOTA DI AEROMOBILE DIRETTORE COORDINATORE SPECIALE",
        "PILOTA DI AEROMOBILE DIRETTORE SPECIALE",
        "PILOTA DI AEROMOBILE ISPETTORE COORDINATORE",
        "PILOTA DI AEROMOBILE ISPETTORE ESPERTO",
        "PILOTA DI AEROMOBILE ISPETTORE",
        "PILOTA DI AEROMOBILE VICE DIRETTORE SPECIALE",
        "PILOTA DI AEROMOBILE VIGILE DEL FUOCO COORDINATORE",
        "PILOTA DI AEROMOBILE VIGILE DEL FUOCO ESPERTO",
        "PILOTA DI AEROMOBILE VIGILE DEL FUOCO",
        "PRIMO DIRIGENTE AIB",
        "PRIMO DIRIGENTE GINNICO-SPORTIVO",
        "PRIMO DIRIGENTE INFORMATICO",
        "PRIMO DIRIGENTE LOGISTICO-GESTIONALE",
        "PRIMO DIRIGENTE MEDICO",
        "PRIMO DIRIGENTE SANITARIO",
        "PRIMO DIRIGENTE",
        "SOMMOZZATORE CAPO REPARTO",
        "SOMMOZZATORE CAPO SQUADRA ESPERTO",
        "SOMMOZZATORE CAPO SQUADRA",
        "SOMMOZZATORE DIRETTORE COORDINATORE SPECIALE",
        "SOMMOZZATORE DIRETTORE SPECIALE",
        "SOMMOZZATORE ISPETTORE COORDINATORE",
        "SOMMOZZATORE ISPETTORE ESPERTO",
        "SOMMOZZATORE ISPETTORE",
        "SOMMOZZATORE VICE DIRETTORE SPECIALE",
        "SOMMOZZATORE VIGILE DEL FUOCO COORDINATORE",
        "SOMMOZZATORE VIGILE DEL FUOCO ESPERTO",
        "SOMMOZZATORE VIGILE DEL FUOCO",
        "SPECIALISTA DI AEROMOBILE CAPO REPARTO",
        "SPECIALISTA DI AEROMOBILE CAPO SQUADRA ESPERTO",
        "SPECIALISTA DI AEROMOBILE CAPO SQUADRA",
        "SPECIALISTA DI AEROMOBILE DIRETTORE COORDINATORE SPECIALE",
        "SPECIALISTA DI AEROMOBILE DIRETTORE SPECIALE",
        "SPECIALISTA DI AEROMOBILE ISPETTORE COORDINATORE",
        "SPECIALISTA DI AEROMOBILE ISPETTORE ESPERTO",
        "SPECIALISTA DI AEROMOBILE ISPETTORE",
        "SPECIALISTA DI AEROMOBILE VICE DIRETTORE SPECIALE",
        "SPECIALISTA DI AEROMOBILE VIGILE DEL FUOCO COORDINATORE",
        "SPECIALISTA DI AEROMOBILE VIGILE DEL FUOCO ESPERTO",
        "SPECIALISTA DI AEROMOBILE VIGILE DEL FUOCO",
        "VICE DIRETTORE AGGIUNTO",
        "VICE DIRETTORE AIB",
        "VICE DIRETTORE GINNICO-SPORTIVO",
        "VICE DIRETTORE INFORMATICO",
        "VICE DIRETTORE LOGISTICO-GESTIONALE",
        "VICE DIRETTORE SANITARIO",
        "VICE DIRETTORE SPECIALE ANTINCENDI AIB",
        "VICE DIRETTORE SPECIALE INFORMATICO",
        "VICE DIRETTORE SPECIALE LOGISTICO-GESTIONALE",
        "VICE DIRETTORE SPECIALE",
        "VICE DIRETTORE TECNICO-SCIENTIFICO",
        "VICE DIRETTORE",
        "ASSISTENTE AMMINISTRATIVO",
        "ASSISTENTE ECONOMICO-FINANZIARIO",
        "ASSISTENTE INFORMATICO",
        "ASSISTENTE LINGUISTICO",
        "ASSISTENTE SCATTO CONVENZIONALE \"Capo\"",
        "ASSISTENTE TECNICO",
        "AUSILIARIO",
        "AUSILIARIO TECNICO",
        "COLL AMMINISTRATIVO-CONTABILE COMANDATO",
        "CONSIGLIERE/VICE CONSIGLIERE DI PREFETTURA",
        "FUNZIONARIO AMMINISTRATIVO",
        "FUNZIONARIO ECONOMICO-FINANZIARIO",
        "FUNZIONARIO INFORMATICO",
        "FUNZIONARIO LINGUISTICO",
        "FUNZIONARIO STATISTICO",
        "FUNZIONARIO TECNICO",
        "OPERATORE AMMINISTRATIVO",
        "OPERATORE ESPERTO SCATTO CONVENZIONALE",
        "OPERATORE TECNICO",
        "PREFETTO",
        "VICE COLLABORATORE AMM-CONT COMANDATO",
        "VICE DIRETTORE SPECIALE INFORMATICO RE",
        "VICE PREFETTO",
        "VICE PREFETTO AGGIUNTO",
    ]
};

@Injectable()
@State<QualificheStateModel>({
    name: 'qualifiche',
    defaults: qualificheStateDefaults
})
export class QualificheState {

    @Selector()
    static qualifiche(state: QualificheStateModel) {
        return state.qualifiche;
    }
}
