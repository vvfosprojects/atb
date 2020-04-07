import { LinkCaseInterface } from '../../../shared/interface';

export class SetLink {
    static readonly type = '[ConvertCase] Set Link';

    constructor(public link: LinkCaseInterface) {
    }
}

export class ClearConvertCase {
    static readonly type = '[ConvertCase] Clear ConvertCase';
}
