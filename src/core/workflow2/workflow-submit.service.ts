import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiUrl, Http } from '../rest';

export interface SubmitOptions {
    id: any;
    validate?: () => string[];
}

export interface InitiatorCompleteOptions {
    id: any;
    workflowTaskId: string;
    result: {
        key: string,
        value: string,
    },
    validate?: () => string[];
}

@Injectable()
export class WorkflowSubmitService {
    pending = false;

    constructor(
        private http: Http,
        @Inject('WORKFLOW_SUBMIT_API_URL') private taskApi: ApiUrl,
    ) { }

    submit(id: any): Observable<any> {
        return this.http.patch(this.taskApi.submit2(id), {});
    }

    completeByInitiator(id: any, workflowTaskId: string, data: { result: { key: string, value: string }, comment?: string }): Observable<any> {
        return this.http.patch(this.taskApi.completeByInitiator(id, workflowTaskId), data);
    }
}
