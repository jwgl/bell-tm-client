import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { CourseClassAttendanceModule } from './course-class-attendance.module';
import { CourseClassAttendanceService } from './course-class-attendance.service';
import { TeacherCourseClassAttendanceComponent } from './teacher-course-class-attendance.component';
import { TeacherCourseClassAttendanceRoutingModule } from './teacher-course-class-attendance.routing';
import { TeacherCourseClassAttendanceService } from './teacher-course-class-attendance.service';

@NgModule({
    declarations: [
        TeacherCourseClassAttendanceComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        TeacherCourseClassAttendanceRoutingModule,
        CourseClassAttendanceModule,
    ],
    providers: [
        TeacherCourseClassAttendanceService,
        { provide: CourseClassAttendanceService, useExisting: TeacherCourseClassAttendanceService },
        { provide: 'TEACHER_COURSE_CLASS_API_URL', useValue: '/api/here/teachers/${userId}/courseClasses' },
        { provide: 'COURSE_CLASS_API_URL', useValue: '/api/here/courseClasses' },
    ],
})
export class TeacherCourseClassAttendanceModule { }
