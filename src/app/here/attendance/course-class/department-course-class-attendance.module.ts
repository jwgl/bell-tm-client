import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { CourseClassAttendanceModule } from './course-class-attendance.module';
import { CourseClassAttendanceService } from './course-class-attendance.service';
import { DepartmentCourseClassAttendanceComponent } from './department-course-class-attendance.component';
import { DepartmentCourseClassAttendanceRoutingModule } from './department-course-class-attendance.routing';
import { DepartmentCourseClassAttendanceService } from './department-course-class-attendance.service';

@NgModule({
    declarations: [
        DepartmentCourseClassAttendanceComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        CourseClassAttendanceModule,
        DepartmentCourseClassAttendanceRoutingModule,
    ],
    providers: [
        DepartmentCourseClassAttendanceService,
        { provide: CourseClassAttendanceService, useExisting: DepartmentCourseClassAttendanceService },
        { provide: 'DEPARTMENT_COURSE_CLASS_TEACHER_API_URL', useValue: '/api/here/departments/${departmentId}/courseClassTeachers' },
        { provide: 'TEACHER_COURSE_CLASS_API_URL', useValue: '/api/here/teachers/${userId}/courseClasses' },
        { provide: 'COURSE_CLASS_API_URL', useValue: '/api/here/courseClasses' },
        { provide: 'ATTENDANCE_TERM_API_URL', useValue: '/api/here/attendances/terms' },
    ],
})
export class DepartmentCourseClassAttendanceModule { }
