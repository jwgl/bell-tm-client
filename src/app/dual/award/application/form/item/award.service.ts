import { Inject, Injectable } from '@angular/core';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class AwardViewService extends RestEditService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('AWARD_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { departmentId: authService.userInfo.departmentId });
    }
}
