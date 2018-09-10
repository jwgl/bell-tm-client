import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiUrl, Http } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class UserPasswordService {
    api: ApiUrl;
    constructor(
        private http: Http,
        @Inject('USER_PASSWORD_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        this.api = new ApiUrl(apiUrl, {userId: authService.userInfo.id});
    }

    sync(): Observable<any> {
        return this.http.patch(`${this.api.list()}?op=SYNC`, {});
    }
}
