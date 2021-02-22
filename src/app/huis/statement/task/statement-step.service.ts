import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class StatementStepService extends RestEditService {
    constructor(
        http: Http,
        @Inject('STATEMENT_STEP_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    loadStep(id: string, formId: string): Observable<any> {
        return this.http.get(`${this.api.item(id)}?formId=${formId}`)
    }
}
