import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { ApiUrl, Http } from 'core/rest';

import { CourseClass } from './course-class-attendance.model';

export abstract class CourseClassAttendanceService {
    isAdmin: boolean;
    teacherId: string;
    courseClassLoaded = new Subject<CourseClass>();
    courseClassApi: ApiUrl;

    constructor(
        public http: Http, 
        courseClassApiUrl: string,
        isAdmin: boolean
    ) {
        this.courseClassApi = new ApiUrl(courseClassApiUrl);
        this.isAdmin = isAdmin;
    }

    abstract loadTerms(): Observable<any>;

    abstract loadCourseClasses(termId: number): Observable<any>;

    abstract loadCourseClass(courseClassId: string): Observable<any>;

    getStudentAttendances(courseClassId: string, studentId: string): Observable<any> {
        return this.http.get(`${this.courseClassApi.item(courseClassId)}/students/${studentId}/attendances`);
    }

    disqualify(courseClassId: string, studentId: string, disqualified: boolean): Observable<any> {
        const operation = disqualified ? 'QUALIFY' : 'DISQUALIFY';
        return this.http.patch(`${this.courseClassApi.item(courseClassId)}/students/${studentId}?op=${operation}`, {});
    }

    abstract getReportUrl(): string;
}
