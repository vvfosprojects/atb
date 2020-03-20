export interface PositiveCaseInterface {
    subject: Subject;
    data: Data;
}

export interface Subject {
    number: number;
    nome: string;
    cognome: string;
    email: string;
    phone: string;
    role: string;
}

export interface Data {
    estremiProvvedimentiASL: string;
    quarantinePlace: string;
    expectedWorkReturnDate: string;
    actualWorkReturnDate: null;
    closedCase: boolean;
}