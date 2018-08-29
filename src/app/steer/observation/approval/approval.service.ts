import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ApprovalService extends RestEditService {
    constructor(
        http: Http,
        authService: AuthService,
        @Inject('APPROVAL_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }
    feed(id: number): Observable<any> {
         return this.http.patch(`${this.api.item(id)}?op=FINISH`, {});
    }
}
