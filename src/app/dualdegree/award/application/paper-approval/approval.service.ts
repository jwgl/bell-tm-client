import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';
@Injectable()
export class PaperApprovalService extends RestEditService {
    xsrfToken: string;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('APPROVAL_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    finish(id: any): Observable<any> {
        return this.http.patch(`${this.api.item(id)}?op=FINISH`, {});
    }

    getUploadUrl(id: any): string {
        return `/zuul${this.api.item(id)}/upload`;
    }

    loadFileNames(id: any, wi: any): Observable<any> {
        return this.http.get(`${this.api.item(id)}/workitems/${wi}`);
    }
}
