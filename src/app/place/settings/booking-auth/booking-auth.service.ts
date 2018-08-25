import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';

@Injectable()
export class BookingAuthService extends RestEditService {
    constructor(
        http: Http,
        @Inject('BOOKING_AUTH_API_URL')
        apiUrl: string,
        @Inject('DEPARTMENT_TEACHERS_API_URL')
        private teachersUrl: string,
    ) {
        super(http, apiUrl);
    }

    loadTeachers(departmentId: string): Observable<any> {
        return this.http.get(this.teachersUrl.replace('${departmentId}', departmentId));
    }
}
