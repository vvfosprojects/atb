export interface PositiveCaseInterface {
    subject: Subject;
    data: Data;
    group?: string;
}

export interface Subject {
    number?: number;
    nome?: string;
    cognome?: string;
    email?: string;
    phone?: string;
    role: string;
}

export interface Data {
    estremiProvvedimentiASL?: string;
    diseaseConfirmDate: string;
    quarantinePlace: string;
    expectedWorkReturnDate: string;
    actualWorkReturnDate?: string;
}
