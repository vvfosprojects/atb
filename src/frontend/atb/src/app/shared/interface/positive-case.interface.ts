export interface PositiveCaseInterface {
    subject: Subject;
    data: Data;
}

export interface Subject {
    number: number;
    name: string;
    surname: string;
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