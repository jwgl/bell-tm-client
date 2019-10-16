import { Inject, Injectable, Optional } from '@angular/core';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { ListCounts, ListGroup } from './list-group.model';
import { ReviewList } from './review-list.model';

import { ApiUrl, Http } from '../rest';
import { ListOption } from './list-group.model';


export interface SubmitOptions {
    id: any;
    type: 'check' | 'approve';
    what: string;
    validate?: () => string[];
}

export interface ReviewOptions {
    id: any;
    wi: string;
    type: 'check' | 'approve';
    what: string;
    reviews?: any[];
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

    getDoesLabel(type: string) {
        switch (type) {
            case 'check':
                return '审核';
            case 'approve':
                return '审批';
            case 'next':
                return '下一步处理';
            default:
                throw new Error(`Unsupported type: ${type}`);
        }
    }

    loadList(options: { [key: string]: any } = {}): Observable<any> {
        return this.http.get<{ forms: any[], counts: ListCounts }>(this.api.list(options)).pipe(
            tap(result => this.updateListGroup(result.counts)),
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
        return this.http.get<{ counts: ListCounts }>(`${this.api.workitem(id, wi)}?type=${type}&query=${query}`).pipe(
            tap(result => this.updateListGroup(result.counts)),
        );
    }

    submit(id: any, data: { title: string, to: string, comment: string }): Observable<any> {
        return this.http.patch(this.api.submit(id), data);
    }

    getSubmitReviewersUrl(id: any, type: string) {
        switch (type) {
            case 'check':
                return this.api.checkers(id);
            case 'approve':
                return this.api.approvers(id);
            default:
                throw new Error(`Unsupported type: ${type}`);
        }
    }

    accept(id: any, wi: string, data: { title: string, to: string, comment: string }): Observable<any> {
        return this.http.patch<{ counts: ListCounts }>(this.api.accept(id, wi), data).pipe(
            tap(result => this.updateListGroup(result.counts)),
        );
    }

    getAccecptReviewersUrl(id: any, type: string) {
        switch (type) {
            case 'check':
                return this.api.approvers(id);
            case 'approve':
                return null;
            default:
                throw new Error(`Unsupported type: ${type}`);
        }
    }

    reject(id: any, wi: string, data: { title: string, comment: string }): Observable<any> {
        return this.http.patch<{ counts: ListCounts }>(this.api.reject(id, wi), data).pipe(
            tap(result => this.updateListGroup(result.counts)),
        );
    }

    next(id: any, wi: string, data: { title: string, to: string, comment: string }): Observable<any> {
        return this.http.patch<{ counts: ListCounts }>(this.api.next(id, wi), data).pipe(
            tap(result => this.updateListGroup(result.counts)),
        );
    }

    review(id: any, wi: string, data: { title: string, to: string, comment: string, review: string }): Observable<any> {
        return this.http.patch<{ counts: ListCounts }>(this.api.review(id, wi), data).pipe(
            tap(result => this.updateListGroup(result.counts)),
        );
    }

    getNextReviewersUrl(id: any, type: string) {
        switch (type) {
            case 'next':
                return this.api.tousers(id);
            default:
                throw new Error(`Unsupported type: ${type}`);
        }
    }

    getReviewersUrl(id: any) {
        return this.api.reviewers(id);
    }

    revoke(id: any, data: { title: string, comment: string }): Observable<any> {
        return this.http.patch(this.api.revoke(id), data);
    }

    rollback(id: any, data: { title: string, comment: string }): Observable<any> {
        return this.http.patch(this.api.rollback(id), data);
    }

    private updateListGroup(listCounts: ListCounts): void {
        if (listCounts) {
            this.listGroup.update(listCounts);
        }
    }
}
