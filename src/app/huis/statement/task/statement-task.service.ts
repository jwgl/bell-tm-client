import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiUrl, Http, RestEditService } from 'core/rest';
import { AuthService, UserInfo } from 'core/auth';

@Injectable()
export class StatementTaskService extends RestEditService {
    userInfo: UserInfo;
    roomApi: ApiUrl;
    notice: string;

    constructor(
        http: Http,
        @Inject('STATEMENT_TASK_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        this.userInfo = authService.userInfo;
    }

    loadTask(id: string, formId: string): Observable<any> {
        return this.http.get(`${this.api.item(id)}?formId=${formId}`)
    }

    complete(id: string, data: any): Observable<any> {
        return this.http.patch(`${this.api.item(id)}/complete`, data)
    }
}
