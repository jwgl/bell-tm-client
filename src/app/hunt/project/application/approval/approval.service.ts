import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ApprovalService extends RestEditService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('APPROVAL_API_URL')
        apiUrl: string,
        @Inject('TASK_APPROVAL_API_URL')
        private taskApiUrl: string,
        @Inject('TEAM_API_URL')
        private teamApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        this.taskApiUrl = this.taskApiUrl.replace('${userId}', authService.userInfo.id);
    }

    batchUpdate(value: any): Observable<any> {
        return this.http.post(this.api.list(), value);
    }

    loadTaskList(): Observable<any> {
        return this.http.get(`${this.taskApiUrl}`);
    }

    loadReviewCounts(taskId: number): Observable<any> {
        return this.http.get(`${this.taskApiUrl}?taskId=${taskId}`);
    }

    loadApplicationItem(workitem: string, id: number, type: string): Observable<any> {
        return this.http.get(`${this.api.list()}/${id}/workitems/${workitem}?type=${type}`);
    }

    loadTeam(): Observable<any> {
        return this.http.get(this.teamApiUrl);
    }

    finish(id: any, wi: string): Observable<any> {
        return this.http.patch(`${this.api.item(id)}/workitems/${wi}?op=FINISH`, {});
    }

    getDownloadUrl(id: any): string {
        return `${this.api.item(id)}/attachments`;
    }
}
