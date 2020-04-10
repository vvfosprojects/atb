import { LinkCaseInterface } from '../../../shared/interface/common';

export class SetPageTitleFormPositivo {
    static readonly type = '[FormPositivo] Set Page Title Form Positivo';

    constructor(public title: string) {
    }
}

export class SaveNewPositivoCase {
    static readonly type = '[FormPositivo] Save New Positivo Case';

    constructor(public link?: LinkCaseInterface) {
    }
}

export class ConvertPositiveCase {
    static readonly type = '[FormPositivo] Convert Positive Case';
}

export class UpdatePositivoCase {
    static readonly type = '[FormPositivo] Update Positivo Case';

    constructor(public convertToSuspect = false) {
    }
}

export class SetPositivoDeceased {
    static readonly type = '[FormPositivo] Set Deceased Positivo';

    constructor(public deceased: string) {
    }
}

export class ClearFormPositivo {
    static readonly type = '[FormPositivo] Clear State';
}
