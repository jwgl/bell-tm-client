import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ApprovalService extends RestShowService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('APPROVAL_API_URL')
        apiUrl: string,
        @Inject('TASK_APPROVAL_API_URL')
        private taskApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        taskApiUrl = taskApiUrl.replace('${userId}', authService.userInfo.id);
    }

    lockOrUnlock(value: any): Observable<any> {
        return this.http.post(this.api.list(), value);
    }

    loadTaskList(): Observable<any> {
        return this.http.get(`${this.taskApiUrl}`);
    }

    loadApplicationItem(workitem: string, id: number, type: string): Observable<any> {
        return this.http.get(`${this.api.list()}/${id}/workitems/${workitem}?type=${type}`);
    }
}
