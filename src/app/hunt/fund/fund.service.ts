import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class FundService extends RestEditService {

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('FUND_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    batchSave(form: any): Observable<any> {
        return this.http.post(this.api.list(), form);
    }
}
