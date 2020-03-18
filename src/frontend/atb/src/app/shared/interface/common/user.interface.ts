import { Roles } from '../../enum/roles.enum';

export interface UserInterface {
    username: string;
    roles: Roles[];
    group: string;
    password?: string;
}
