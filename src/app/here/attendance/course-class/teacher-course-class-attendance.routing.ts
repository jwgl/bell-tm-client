import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseClassAttendanceComponent } from './course-class-attendance.component';
import { TeacherCourseClassAttendanceComponent } from './teacher-course-class-attendance.component';

const routes: Routes = [{
    path: '',
    component: TeacherCourseClassAttendanceComponent,
    children: [
        { path: ':id', component: CourseClassAttendanceComponent },
    ],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class TeacherCourseClassAttendanceRoutingModule { }
