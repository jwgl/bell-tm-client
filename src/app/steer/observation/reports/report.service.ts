import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ReportService extends RestShowService {
    constructor(
        http: Http,
        @Inject('REPORT_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    teacherActiveReport(): Observable<any> {
        return this.http.get(`${this.api.list()}/teacherActive`);
    }
}
