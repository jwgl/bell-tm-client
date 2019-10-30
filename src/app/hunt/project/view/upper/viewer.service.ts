import { Inject, Injectable } from '@angular/core';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ProjectService extends RestEditService {
    list: any[];
    queryOptions: any;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('PROJECT_API_URL')
        apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }
}
