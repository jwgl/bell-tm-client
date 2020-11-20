import { Inject, Injectable } from '@angular/core';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class CenterService extends RestEditService {
    queryOptions: any;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('CENTER_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }
}
