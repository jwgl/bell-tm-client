import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class LeaveFormService extends RestEditService {
    constructor(
        http: Http,
        @Inject('LEAVE_FORM_API_URL') apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    finish(id: any): Observable<any> {
        return this.http.patch(`${this.api.item(id)}?op=FINISH`, {});
    }
}
