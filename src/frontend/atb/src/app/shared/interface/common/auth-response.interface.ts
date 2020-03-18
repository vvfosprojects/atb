import { Roles } from '../../enum/roles.enum';

export interface AuthResponseInterface {
    result: string;
    errorMsg: string;
    jwt: string;
    roles: Roles[];
}
