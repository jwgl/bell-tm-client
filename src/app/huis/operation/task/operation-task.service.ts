import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class OperationTaskService extends RestEditService {
    constructor(
        http: Http,
        @Inject('OPERATION_TASK_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    loadTask(id: string, formId: string): Observable<any> {
        return this.http.get(`${this.api.item(id)}?formId=${formId}`)
    }

    complete(id: string, data: any): Observable<any> {
        return this.http.patch(`${this.api.item(id)}/complete`, data)
    }
}
