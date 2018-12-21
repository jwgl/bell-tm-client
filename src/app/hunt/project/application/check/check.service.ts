import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class CheckService extends RestShowService {
    list: any[];
    isCheckTime: boolean;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('CHECK_API_URL')
        apiUrl: string,
        @Inject('TASK_CHECK_API_URL')
        private taskApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        this.taskApiUrl = this.taskApiUrl.replace('${userId}', authService.userInfo.id);
    }

    loadTaskList(): Observable<any> {
        return this.http.get(`${this.taskApiUrl}`);
    }

    loadTaskItem<T>(id: number): Observable<any> {
        return this.http.get(`${this.taskApiUrl}/${id}`);
    }

    loadApplicationItem(workitem: string, id: number, type: string): Observable<any> {
        return this.http.get(`${this.api.list()}/${id}/workitems/${workitem}?type=${type}`);
    }

    getDownloadUrl(id: any): string {
        return `${this.api.item(id)}/attachments`;
    }
}
