import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ProjectFormService extends RestEditService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('PROJECT_API_URL')
        apiUrl: string,
        @Inject('TASKPUBLIC_API_URL')
        private taskApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        this.taskApiUrl = this.taskApiUrl.replace('${userId}', authService.userInfo.id);
    }

    save<T>(id: number, form: any): Observable<any> {
        if (id) {
            return this.update(id, form);
        } else {
            return this.create(form);
        }
    }

    submit(id: number, options: any): Observable<any> {
        return this.http.patch(`${this.api.item(id)}?op=SUBMIT`, options);
   }

    loadTaskList(): Observable<any> {
        return this.http.get(`${this.taskApiUrl}`);
    }

    loadTaskItem<T>(id: number): Observable<any> {
        return this.http.get(`${this.taskApiUrl}/${id}`);
    }

    getUploadUrl(options: { [key: string]: any } = {}): string {
        return `/zuul${this.api.list()}/upload?taskId=${options.taskId}`;
    }

    loadAllTask(): Observable<any> {
        return this.http.get(`${this.taskApiUrl}?all=true`);
    }
}
