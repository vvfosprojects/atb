import { HealthMeasureInterface } from './health-measure.interface';
import { QuarantinePlaceEnum } from '../enum/quarantine-place.enum';
import { HistoryCaseInterface } from './history-case.interface';

export interface SuspectCaseInterface {
    subject: Subject;
    data: Data;
    group?: string;
    history?: HistoryCaseInterface[];
}

export interface Subject {
    number: number;
    nome?: string;
    cognome?: string;
    email?: string;
    phone?: string;
    role: string;
}

export interface Data {
    quarantinePlace: QuarantinePlaceEnum;
    expectedWorkReturnDate: string;
    actualWorkReturnDate?: string;
    healthMeasure: HealthMeasureInterface;
}
