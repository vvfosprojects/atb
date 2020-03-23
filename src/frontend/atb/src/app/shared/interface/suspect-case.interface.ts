export interface SuspectCaseInterface {
    subject: Subject;
    data: Data;
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
    quarantinePlace: string;
    expectedWorkReturnDate: string;
    actualWorkReturnDate?: string;
}
