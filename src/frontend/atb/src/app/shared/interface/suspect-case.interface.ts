export interface SuspectCaseInterface {
    data: Subject;
    updates: Data[];
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
    quarantinePlace: string;
    expectedWorkReturnDate: string;
    actualWorkReturnDate: null;
    closedCase: boolean;
}