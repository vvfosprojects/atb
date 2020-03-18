import { of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { UserInterface } from '../../../shared/interface/common/user.interface';

const users: UserInterface[] = [
    { username: 'mario.rossi', password: 'test' },
    { username: 'luigi.bianchi', password: 'test' }
];

export class AuthenticationFakeService {

    login(username: string, password: string) {
        const user = users.find(x => x.username === username && x.password === password);
        if (!user) {
            return error('Username o password errati');
        }
        return ok({
            token: `fake-opservice-jwt-token.${user.username}`,
            user
        });

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }

}
