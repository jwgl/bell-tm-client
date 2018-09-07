import { Inject, Injectable } from '@angular/core';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class FinderService extends RestShowService {

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('FINDER_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }
}
