import { Inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Http, RestEditService } from 'core/rest';
import { AuthService, UserInfo } from 'core/auth';

@Injectable()
export class BookingFormService extends RestEditService {
    userInfo: UserInfo;

    notice: string;

    constructor(
        http: Http,
        @Inject('BOOKING_FORM_API_URL') apiUrl: string,
        authService: AuthService,
        @Inject('DEPARTMENT_BOOKING_TYPES_API_URL')
        private departmentBookingTypesApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        this.userInfo = authService.userInfo;
    }

    getDepartmentBookingType(departmentId: string): Observable<any> {
        const url = this.departmentBookingTypesApiUrl.replace('${departmentId}', departmentId);
        return this.http.get(url);
    }

    findPlace(options: any) {
        return this.http.get(`${this.api.list()}/places?${this.api.buildQueryString(options)}`);
    }

    getNotice(): Observable<string> {
        if (this.notice) {
            return of(this.notice);
        } else {
            return this.http.get<{notice: string}>(`${this.api.list()}/notice`).pipe(
                map(result => result.notice),
                tap(notice => this.notice = notice),
            );
        }
    }
}
