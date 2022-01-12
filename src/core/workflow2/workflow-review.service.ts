import { Inject, Injectable, Optional } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiUrl, Http } from '../rest';
import { HttpResponse } from '@angular/common/http';

export interface CompleteOptions {
    taskId: string;
    result: {
        key: string,
        value: string,
    },
    validate?: () => string[];
}

@Injectable()
export class WorkflowService {
    pending = false;
    taskUrl: string;

    constructor(
        private http: Http,
        @Inject('WORKFLOW_TASK_API_URL') private taskApi: ApiUrl,
        @Inject('WORKFLOW_STEP_API_URL') private stepApi: ApiUrl,
    ) {
        this.taskUrl = this.taskApi.list();
     }

    loadTasks<T>(params?: { [param: string]: string | string[] }): Observable<T[]> {
        return this.http.get<T[]>(this.taskApi.list(), params);
    }

    loadTask(taskId: string, formId: string): Observable<any> {
        return this.http.get(`${this.taskApi.item(taskId)}?formId=${formId}`)
    }

    loadSteps<T>(page: number, size: number, params?: { [param: string]: string | string[] })
        : Observable<{ items: T[], totalCount: number }> {
        return this.http.getResponse<T[]>(this.stepApi.list(), { page: `${page}`, size: `${size}`, ...params }).pipe(
            map(rep => ({
                items: rep.body,
                totalCount: this.getTotalCountHeader(rep),
            }))
        );
    }

    loadStep(taskId: string, formId: string): Observable<any> {
        return this.http.get(`${this.stepApi.item(taskId)}?formId=${formId}`)
    }

    complete(id: string, data: any): Observable<any> {
        return this.http.patch(`${this.taskApi.item(id)}/complete`, data)
    }

    message(data: any): Observable<any> {
        return this.http.post('/api/asset/messages', data);
    }

    private getTotalCountHeader(response: HttpResponse<any>): number {
        const xTotalCount = response.headers.get('X-Total-Count');
        if (xTotalCount) {
            return parseInt(xTotalCount, 10);
        } else {
            throw new Error('Response does not contains header X-Total-Count.');
        }
    }
}
