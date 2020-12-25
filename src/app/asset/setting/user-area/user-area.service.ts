import { Inject, Injectable } from '@angular/core';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class UserAreaService extends RestEditService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('USER_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }
}
