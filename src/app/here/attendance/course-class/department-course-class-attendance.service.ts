import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http, ApiUrl } from 'core/rest';

import { CourseClassAttendanceService } from './course-class-attendance.service';
import { AuthService } from 'core/auth';

@Injectable()
export class DepartmentCourseClassAttendanceService extends CourseClassAttendanceService {
    departmentCourseClassTeacherApi: ApiUrl;

    constructor(
        http: Http,
        @Inject('DEPARTMENT_COURSE_CLASS_TEACHER_API_URL') departmentCourseClassTeacherApiUrl: string,
        @Inject('TEACHER_COURSE_CLASS_API_URL') private teacherCourseClassApiUrl: string,
        @Inject('COURSE_CLASS_API_URL') courseClassApiUrl: string,
        @Inject('ATTENDANCE_TERM_API_URL') private attendanceTermsApiUrl: string,
        authService: AuthService,
    ) {
        super(http, courseClassApiUrl, true);
        this.departmentCourseClassTeacherApi = new ApiUrl(departmentCourseClassTeacherApiUrl, {
            departmentId: authService.userInfo.departmentId
        });
    }

    loadTerms(): Observable<any> {
        return this.http.get(this.attendanceTermsApiUrl);
    }

    loadCourseClassTeachers(termId: number): Observable<any[]> {
        return this.http.get(`${this.departmentCourseClassTeacherApi.list({termId})}`);
    }

    loadCourseClasses(termId: number): Observable<any[]> {
        return this.http.get(`${this.getTeacherCourseApiUrl()}?termId=${termId}`);
    }

    loadCourseClass(courseClassId: string): Observable<any> {
        return this.http.get(`${this.getTeacherCourseApiUrl()}/${courseClassId}`);
    }

    getTeacherCourseApiUrl(): string {
        return this.teacherCourseClassApiUrl.replace('${userId}', this.teacherId);
    }

    getReportUrl(): string {
        return this.getTeacherCourseApiUrl();
    }
}
