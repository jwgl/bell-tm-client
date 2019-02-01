import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ReviewService extends RestEditService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('REVIEW_API_URL')
        apiUrl: string,
        @Inject('TASK_EXPERT_API_URL')
        private taskApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        this.taskApiUrl = this.taskApiUrl.replace('${userId}', authService.userInfo.id);
    }

    submit(id: number): Observable<any> {
        return this.http.patch(`${this.api.item(id)}?op=SUBMIT`, {});
    }

    loadTaskList(): Observable<any> {
        return this.http.get(`${this.taskApiUrl}`);
    }

    loadTaskItem<T>(id: number): Observable<any> {
        return this.http.get(`${this.taskApiUrl}/${id}`);
    }
}
