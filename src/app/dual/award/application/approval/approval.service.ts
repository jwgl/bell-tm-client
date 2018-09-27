import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ApprovalService extends RestShowService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('APPROVAL_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    setMentor(id: number, value: any): Observable<any> {
        return this.http.put(`${this.api.item(id)}`, value);
    }

    getMentors(): Observable<any> {
        return this.http.get(`${this.api.list()}/mentors`);
    }
}
