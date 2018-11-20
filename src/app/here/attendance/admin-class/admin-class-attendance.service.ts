import { Inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiUrl, Http } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class AdminClassAttendanceService {
    private _terms: number[];

    public isAdmin: boolean;
    public adminClassApi: ApiUrl;
    public attendanceApi: ApiUrl;
    public adminClassId: string;

    constructor(
        private http: Http,
        @Inject('ADMIN_CLASS_ATTENDANCE_API_URL')
        adminClassAttendanceApi: string,
        authService: AuthService,
        @Inject('ATTENDANCE_API_URL')
        attendanceAPiUrl: string,
        @Inject('IS_ATTENDANCE_ADMIN')
        isAdmin: boolean
    ) {
        this.adminClassApi = isAdmin
            ? new ApiUrl(adminClassAttendanceApi, { departmentId: authService.userInfo.departmentId })
            : new ApiUrl(adminClassAttendanceApi, { userId: authService.userInfo.id });
        this.attendanceApi = new ApiUrl(attendanceAPiUrl);
        this.isAdmin = isAdmin;
    }

    loadTerms(): Observable<any> {
        if (this._terms) {
            return of(this._terms);
        } else {
            return this.http.get(`${this.attendanceApi.list()}/terms`).pipe(tap(terms => this._terms = terms));
        }
    }

    loadAdminClasses(termId: number): Observable<any[]> {
        return this.http.get(`${this.adminClassApi.list()}?termId=${termId}`);
    }

    loadAll(termId: number): Observable<any> {
        return this.http.get(`${this.adminClassApi.list()}/attendances?termId=${termId}`);
    }

    loadList(termId: number, adminClassId: number): Observable<any> {
        return this.http.get(`${this.adminClassApi.item(adminClassId)}/attendances?termId=${termId}`);
    }

    loadItem(termId: number, studentId: string): Observable<any> {
        return this.http.get(`${this.attendanceApi.item(studentId)}?termId=${termId}`);
    }

    getStatisReportUrl(termId: number): string {
        return `${this.adminClassApi.list()}/statisReport?termId=${termId}`;
    }

    getDetailReportUrl(termId: number): string {
        return `${this.adminClassApi.list()}/detailReport?termId=${termId}`;
    }

    getDisqualReportUrl(termId: number): string {
        return `${this.adminClassApi.list()}/disqualReport?termId=${termId}`;
    }
}
