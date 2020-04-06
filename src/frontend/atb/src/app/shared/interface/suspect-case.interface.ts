import { HealthMeasureInterface } from './health-measure.interface';
import { QuarantinePlaceEnum } from '../enum/quarantine-place.enum';
import { HistoryCaseInterface } from './history-case.interface';
import { UpdateInterface } from './update.interface';

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

export interface Data extends UpdateInterface {
    quarantinePlace: QuarantinePlaceEnum;
    expectedWorkReturnDate: string;
    dateOfDeath?: string;
    actualWorkReturnDate?: string;
    healthMeasure: HealthMeasureInterface;
}
