import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class AdministrationService extends RestShowService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('TASK_APPROVAL_API_URL')
        apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    loadProjects<T>(id: number, params?: { [param: string]: string | string[] }): Observable<any> {
        return this.http.get<T>(`${this.api.item(id)}/projects`, params);
    }

    loadProjectItem<T>(taskId: number, id: number): Observable<any> {
        return this.http.get<T>(`${this.api.item(taskId)}/projects/${id}`);
    }

    getDownloadUrl(taskId: any, id: any): string {
        return `${this.api.item(taskId)}/projects/${id}/attachments`;
    }
}
