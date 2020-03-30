import { QuarantinePlaceEnum } from '../enum/quarantine-place.enum';

export interface HistoryCaseInterface {
    quarantinePlace: QuarantinePlaceEnum;
    expectedWorkReturnDate: string;
    updatedAt: string;
    updatedBy: string;
}
