import { Inject, Injectable } from '@angular/core';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ObservationFormService extends RestEditService {
    list: any[];
    offset = 0;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('DEAN_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }
}
