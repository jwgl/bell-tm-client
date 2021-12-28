import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class PlanService extends RestEditService {
    userId: string;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('PLAN_API_URL')
        apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    finish(id: number): Observable<any> {
        return this.http.patch(`${this.api.item(id)}?op=FINISH`, {});
    }

    process(id: number): Observable<any> {
        return this.http.patch(`${this.api.item(id)}?op=PROCESS`, {});
    }

    cancel(id: number): Observable<any> {
        return this.http.patch(`${this.api.item(id)}?op=CANCEL`, {});
    }
}
