import { Inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ApplicationFormService extends RestEditService {
    list: any[];
    notice: string;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('APPLICATION_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    loadDataForCreate(options: { [key: string]: any } = {}): Observable<any> {
        return this.http.get(`${this.api.list()}/create?awardId=${options.awardId}`);
    }

    loadApplicationForm(id: any, options: { [key: string]: any } = {}): Observable<any> {
        return this.http.get(`${this.api.list()}/${options.awardId}/applications/${id}`);
    }

    getUploadUrl(options: { [key: string]: any } = {}): string {
        return `/zuul${this.api.list()}/upload?awardId=${options.awardId}`;
    }

    loadPaperForm(id: number): Observable<any> {
        return this.http.get(`${this.api.item(id)}/papers`);
    }

    createPaperForm(id: number, value: any): Observable<string> {
        return this.http.post(`${this.api.item(id)}/papers`, value).pipe(
            map((data: any) => data.id)
        );
    }

    loadNotice(): Observable<string> {
        if (this.notice) {
            return of(this.notice);
        } else {
            return this.http.get<{ notice: string }>(`${this.api.list()}/notice`).pipe(
                tap(result => this.notice = result.notice),
                map(result => result.notice),
            );
        }
    }

    next(id: any, wi: string, title: string): Observable<any> {
        return this.http.patch(`${this.api.item(id)}/workitems/${wi}?op=NEXT`, { title });
    }
}
