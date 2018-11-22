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
        @Inject('PROJECT_API_URL') apiUrl: string,
        @Inject('TASKPUBLIC_API_URL')
        private reviewTaskURL: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        reviewTaskURL = reviewTaskURL.replace('${userId}', authService.userInfo.id);
    }

    save(id: number, form: any): Observable<any> {
        if (id) {
            return this.update(id, form);
        } else {
            return this.create(form);
        }
    }

    loadTaskList(): Observable<any> {
        return this.http.get(`${this.reviewTaskURL}`);
    }

    loadTaskItem(id: number): Observable<any> {
        return this.http.get(`${this.reviewTaskURL}/${id}`);
    }

    getUploadUrl(options: { [key: string]: any } = {}): string {
        return `/zuul${this.api.list()}/upload?taskId=${options.taskId}`;
    }
}
