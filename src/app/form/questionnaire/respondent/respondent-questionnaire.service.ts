import { Inject, Injectable } from '@angular/core';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ResponseFormService extends RestShowService {
    constructor(
        http: Http,
        @Inject('RESPONDENT_QUESTIONNAIE_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }
}
