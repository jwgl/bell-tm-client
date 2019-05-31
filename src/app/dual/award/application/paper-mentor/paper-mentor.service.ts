import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class PaperMentorService extends RestShowService {
    constructor(
        http: Http,
        authService: AuthService,
        @Inject('APPROVAL_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    finish(id: any, comment: string): Observable<any> {
        return this.http.patch(`${this.api.item(id)}?op=FINISH`, { comment });
    }

    setMentor(value: any): Observable<any> {
        return this.http.post(this.api.list(), value);
    }

    getMentors(): Observable<any> {
        return this.http.get(`${this.api.item(0)}/mentorsExcept`);
    }
}
