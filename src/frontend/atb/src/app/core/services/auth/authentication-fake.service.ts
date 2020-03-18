import { of, throwError } from 'rxjs';
import { UserInterface } from '../../../shared/interface/common/user.interface';
import { AuthResponseInterface } from '../../../shared/interface/common';
import { Roles } from '../../../shared/enum/roles.enum';

const users: UserInterface[] = [
    { username: 'mario.rossi', group: 'Roma', roles: [ Roles.Doctor ], password: 'test' },
    { username: 'luigi.bianchi', group: 'Roma', roles: [ Roles.Manager ], password: 'test' }
];

export class AuthenticationFakeService {

    login(username: string, password: string) {
        const user = users.find(x => x.username === username && x.password === password);
        if (!user) {
            return error('Username o password errati');
        }
        return of({
            success: true,
            errorMsg: ``,
            jwt: `fake-atb-jwt-token.${user.username}`,
            roles: user.roles,
            group: user.group,
            username: user.username
        } as AuthResponseInterface);

        function error(message) {
            return throwError({
                status: 400, error: {
                    success: false,
                    errorMsg: message,
                    jwt: ``,
                    group: ``,
                    roles: []
                } as AuthResponseInterface
            });
        }
    }

}
