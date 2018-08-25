import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseClassAttendanceComponent } from './course-class-attendance.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: ':id', component: CourseClassAttendanceComponent },
            { path: ':teacherId/:id', component: CourseClassAttendanceComponent },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class CourseClassRoutingModule { }
