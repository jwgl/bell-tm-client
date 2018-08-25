import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'users/:userId/schemes',
    loadChildren: './scheme/form/scheme-form.module#SchemeFormModule',
}, {
    path: 'checkers/:userId/schemes',
    loadChildren: './scheme/check/scheme-check.module#SchemeCheckModule',
}, {
    path: 'approvers/:userId/schemes',
    loadChildren: './scheme/approval/scheme-approval.module#SchemeApprovalModule',
}, {
    path: 'departments/:departmentId/schemes',
    loadChildren: './scheme/department/scheme-department.module#SchemeDepartmentModule',
}, {
    path: 'admin/schemes',
    loadChildren: './scheme/admin/scheme-admin.module#SchemeAdminModule',
}, {
    path: 'schemes',
    loadChildren: './scheme/public/scheme-public.module#SchemePublicModule',
}, {
    path: 'users/:userId/visions',
    loadChildren: './vision/form/vision-form.module#VisionFormModule',
}, {
    path: 'checkers/:userId/visions',
    loadChildren: './vision/check/vision-check.module#VisionCheckModule',
}, {
    path: 'approvers/:userId/visions',
    loadChildren: './vision/approval/vision-approval.module#VisionApprovalModule',
}, {
    path: 'visions',
    loadChildren: './vision/public/vision-public.module#VisionPublicModule',
}, {
    path: 'settings/subjects',
    loadChildren: './settings/subject/subject-director.module#SubjectDirectorModule',
}, {
    path: 'settings/programs',
    loadChildren: './settings/program/program-settings.module#ProgramSettingsModule',
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class PlanRoutingModule { }
