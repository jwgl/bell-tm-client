import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiUrl, Http } from 'core/rest';

import { CourseClassAttendanceService } from './course-class-attendance.service';
import { AuthService } from 'core/auth';

@Injectable()
export class TeacherCourseClassAttendanceService extends CourseClassAttendanceService {
    teacherCourseClassApi: ApiUrl;

    constructor(
        http: Http,
        @Inject('TEACHER_COURSE_CLASS_API_URL') teacherCourseClassApiUrl: string,
        @Inject('COURSE_CLASS_API_URL') courseClassApiUrl: string,
        authService: AuthService,
    ) {
        super(http, courseClassApiUrl, false);
        this.teacherCourseClassApi = new ApiUrl(teacherCourseClassApiUrl, { userId: authService.userInfo.id });
    }

    loadTerms(): Observable<any> {
        return this.http.get(`${this.teacherCourseClassApi.list()}/terms`);
    }

    loadCourseClasses(termId: number): Observable<any> {
        return this.http.get(`${this.teacherCourseClassApi.list()}?termId=${termId}`);
    }

    loadCourseClass(courseClassId: string): Observable<any> {
        return this.http.get(this.teacherCourseClassApi.item(courseClassId));
    }

    getReportUrl(): string {
        return this.teacherCourseClassApi.list();
    }
}
