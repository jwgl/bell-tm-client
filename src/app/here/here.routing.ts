import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'teachers/:userId/rollcalls',
    loadChildren: () => import('./rollcall/form/rollcall-form.module').then(m => m.RollcallFormModule),
}, {
    path: 'students/:userId/leaves',
    loadChildren: () => import('./leave/form/leave-form.module').then(m => m.LeaveFormModule),
}, {
    path: 'approvers/:userId/leaves',
    loadChildren: () => import('./leave/approval/leave-approval.module').then(m => m.LeaveApprovalModule),
}, {
    path: 'leaves',
    loadChildren: () => import('./leave/view/leave-view.module').then(m => m.LeaveViewModule),
}, {
    path: 'students/:userId/freeListens',
    loadChildren: () => import('./free-listen/form/free-listen-form.module').then(m => m.FreeListenFormModule),
}, {
    path: 'teachers/:userId/freeListens',
    loadChildren: () => import('./free-listen/check/free-listen-check.module').then(m => m.FreeListenCheckModule),
}, {
    path: 'approvers/:userId/freeListens',
    loadChildren: () => import('./free-listen/approval/free-listen-approval.module').then(m => m.FreeListenApprovalModule),
}, {
    path: 'freeListens',
    loadChildren: () => import('./free-listen/view/free-listen-view.module').then(m => m.FreeListenViewModule),
}, {
    path: 'teachers/:userId/courseClasses',
    loadChildren: () => import('./attendance/course-class/teacher-course-class-attendance.module').then(m => m.TeacherCourseClassAttendanceModule),
}, {
    path: 'departments/:departmentId/courseClasses',
    loadChildren: () => import('./attendance/course-class/department-course-class-attendance.module').then(m => m.DepartmentCourseClassAttendanceModule),
}, {
    path: 'teachers/:userId/adminClasses',
    loadChildren: () => import('./attendance/admin-class/teacher-admin-class-attendance.module').then(m => m.TeacherAdminClassAttendanceModule),
}, {
    path: 'departments/:departmentId/adminClasses',
    loadChildren: () => import('./attendance/admin-class/department-admin-class-attendance.module').then(m => m.DepartmentAdminClassAttendanceModule),
}, {
    path: 'students/:userId/attendances',
    loadChildren: () => import('./attendance/student/student-attendance.module').then(m => m.StudentAttendanceModule),
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
