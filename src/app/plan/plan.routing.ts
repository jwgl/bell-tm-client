import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'users/:userId/schemes',
    loadChildren: () => import('./scheme/form/scheme-form.module').then(m => m.SchemeFormModule),
}, {
    path: 'checkers/:userId/schemes',
    loadChildren: () => import('./scheme/check/scheme-check.module').then(m => m.SchemeCheckModule),
}, {
    path: 'approvers/:userId/schemes',
    loadChildren: () => import('./scheme/approval/scheme-approval.module').then(m => m.SchemeApprovalModule),
}, {
    path: 'departments/:departmentId/schemes',
    loadChildren: () => import('./scheme/department/scheme-department.module').then(m => m.SchemeDepartmentModule),
}, {
    path: 'admin/schemes',
    loadChildren: () => import('./scheme/admin/scheme-admin.module').then(m => m.SchemeAdminModule),
}, {
    path: 'schemes',
    loadChildren: () => import('./scheme/public/scheme-public.module').then(m => m.SchemePublicModule),
}, {
    path: 'users/:userId/visions',
    loadChildren: () => import('./vision/form/vision-form.module').then(m => m.VisionFormModule),
}, {
    path: 'checkers/:userId/visions',
    loadChildren: () => import('./vision/check/vision-check.module').then(m => m.VisionCheckModule),
}, {
    path: 'approvers/:userId/visions',
    loadChildren: () => import('./vision/approval/vision-approval.module').then(m => m.VisionApprovalModule),
}, {
    path: 'visions',
    loadChildren: () => import('./vision/public/vision-public.module').then(m => m.VisionPublicModule),
}, {
    path: 'settings/subjects',
    loadChildren: () => import('./settings/subject/subject-director.module').then(m => m.SubjectDirectorModule),
}, {
    path: 'settings/programs',
    loadChildren: () => import('./settings/program/program-settings.module').then(m => m.ProgramSettingsModule),
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
