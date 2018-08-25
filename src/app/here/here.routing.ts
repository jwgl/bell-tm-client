import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'teachers/:userId/rollcalls',
    loadChildren: './rollcall/form/rollcall-form.module#RollcallFormModule',
}, {
    path: 'students/:userId/leaves',
    loadChildren: './leave/form/leave-form.module#LeaveFormModule',
}, {
    path: 'approvers/:userId/leaves',
    loadChildren: './leave/approval/leave-approval.module#LeaveApprovalModule',
}, {
    path: 'leaves',
    loadChildren: './leave/view/leave-view.module#LeaveViewModule',
}, {
    path: 'students/:userId/freeListens',
    loadChildren: './free-listen/form/free-listen-form.module#FreeListenFormModule',
}, {
    path: 'teachers/:userId/freeListens',
    loadChildren: './free-listen/check/free-listen-check.module#FreeListenCheckModule',
}, {
    path: 'approvers/:userId/freeListens',
    loadChildren: './free-listen/approval/free-listen-approval.module#FreeListenApprovalModule',
}, {
    path: 'freeListens',
    loadChildren: './free-listen/view/free-listen-view.module#FreeListenViewModule',
}, {
    path: 'teachers/:userId/courseClasses',
    loadChildren: './attendance/course-class/teacher-course-class-attendance.module#TeacherCourseClassAttendanceModule',
}, {
    path: 'departments/:departmentId/courseClasses',
    loadChildren: './attendance/course-class/department-course-class-attendance.module#DepartmentCourseClassAttendanceModule',
}, {
    path: 'teachers/:userId/adminClasses',
    loadChildren: './attendance/admin-class/teacher-admin-class-attendance.module#TeacherAdminClassAttendanceModule',
}, {
    path: 'departments/:departmentId/adminClasses',
    loadChildren: './attendance/admin-class/department-admin-class-attendance.module#DepartmentAdminClassAttendanceModule',
}, {
    path: 'students/:userId/attendances',
    loadChildren: './attendance/student/student-attendance.module#StudentAttendanceModule',
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class HereRoutingModule { }
