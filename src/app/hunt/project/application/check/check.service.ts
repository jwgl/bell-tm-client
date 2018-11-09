import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class CheckService extends RestShowService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('CHECK_API_URL')
        apiUrl: string,
        @Inject('TASK_CHECK_API_URL')
        private taskApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        taskApiUrl = taskApiUrl.replace('${userId}', authService.userInfo.id);
    }

    loadTaskList(): Observable<any> {
        return this.http.get(`${this.taskApiUrl}`);
    }
}
