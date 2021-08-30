import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class PlanService extends RestEditService {
    userId: string;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('PLAN_API_URL')
        apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }
}
