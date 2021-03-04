import { Inject, Injectable, Optional } from '@angular/core';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { ListCounts, ListGroup } from './list-group.model';
import { ReviewList } from './review-list.model';

import { ApiUrl, Http } from '../rest';
import { ListOption } from './list-group.model';


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

export interface RevokeOptions {
    id: any;
    what: string;
}

export interface NextOptions {
    id: any;
    wi?: string;
    type: string;
    what: string;
}

@Injectable()
export class Workflow {
    listGroup: ListGroup;
    pending = false;

    constructor(
        private http: Http,
        @Inject('WORKFLOW_API_URL') private api: ApiUrl,
        @Optional() @Inject('WORKFLOW_LIST_OPTIONS') listOptions?: ListOption[],
    ) {
        if (listOptions) {
            this.listGroup = new ListGroup(listOptions);
        }
    }

    loadList(options: { [key: string]: any } = {}): Observable<any> {
        return this.http.get<{ forms: any[], counts: ListCounts }>(this.api.list(options)).pipe(
            map(result => new ReviewList({
                type: options.type,
                query: options.query,
                offset: options.offset,
                max: options.max,
                total: result.counts[options.type],
                items: result.forms,
                dateLabel: this.listGroup.getDateLabel(options.type),
            })),
        );
    }

    loadItem(type: string, id: any, wi: string, query: string): Observable<any> {
        return this.http.get<{ counts: ListCounts }>(`${this.api.workitem(id, wi)}?type=${type}&query=${query}`);
    }

    submit(id: any): Observable<any> {
        return this.http.patch(this.api.submit2(id), {});
    }

    complete(id: any, wi: string, data: { title: string, to: string, comment: string }): Observable<any> {
        return this.http.patch(this.api.complete(id), data).pipe(
        );
    }

    completeByInitiator(id: any, workflowTaskId: string, data: { result: { key: string, value: string }, comment?: string }): Observable<any> {
        return this.http.patch(this.api.completeByInitiator(id, workflowTaskId), data);
    }
}
