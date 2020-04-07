import { Roles } from '../../enum/roles.enum';

export interface AuthResponseInterface {
    success: boolean;
    errorMsg: string;
    jwt: string;
    roles: Roles[];
    username: string;
    group: string;
}
