import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseClassAttendanceComponent } from './course-class-attendance.component';
import { DepartmentCourseClassAttendanceComponent } from './department-course-class-attendance.component';

const routes: Routes = [{
    path: '',
    component: DepartmentCourseClassAttendanceComponent,
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
export class DepartmentCourseClassAttendanceRoutingModule { }
