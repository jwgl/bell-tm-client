import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class PaperApprovalService extends RestEditService {

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('APPROVAL_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    finish(id: any, comment: string): Observable<any> {
        return this.http.patch(`${this.api.item(id)}?op=FINISH`, {comment});
    }

    getUploadUrl(id: any): string {
        return `/zuul${this.api.item(id)}/upload`;
    }

    getDownloadUrl(id: any): string {
        return `${this.api.list()}/attachments?awardId=${id}`;
    }

    loadFileNames(id: any, wi: any): Observable<any> {
        return this.http.get(`${this.api.item(id)}/workitems/${wi}`);
    }
}
