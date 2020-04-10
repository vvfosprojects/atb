import { QuarantinePlaceEnum } from '../../enum/quarantine-place.enum';
import { UpdateInterface } from './update.interface';

export interface HistoryCaseInterface extends UpdateInterface {
    quarantinePlace: QuarantinePlaceEnum;
    expectedWorkReturnDate: string;
}
