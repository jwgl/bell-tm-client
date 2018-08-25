import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiUrl, Http } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class StudentAttendanceService {
    studentAttendanceApi: ApiUrl;

    constructor(
        private http: Http,
        @Inject('STUDENT_ATTENDANCE_API_URL') studentAttendanceApiUrl: string,
        authService: AuthService,
    ) {
        this.studentAttendanceApi = new ApiUrl(studentAttendanceApiUrl, {
            userId: authService.userInfo.id,
        });

    }
    loadList(): Observable<any> {
        return this.http.get(this.studentAttendanceApi.list());
    }
}
