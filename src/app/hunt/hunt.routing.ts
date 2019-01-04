import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'settings/types',
    loadChildren: './settings/type/type.module#HuntTypeModule',
}, {
    path: 'settings/tasks',
    loadChildren: './settings/task/task.module#TaskFormModule',
}, {
    path: 'settings/experts',
    loadChildren: './settings/expert/form/expert.module#ExpertFormModule',
}, {
    path: 'settings/checkers',
    loadChildren: './settings/checker/form/checker.module#CheckerFormModule',
}, {
    path: 'teachers/:userId/tasks',
    loadChildren: './project/application/form/form.module#ProjectModule',
}, {
    path: 'checkers/:userId/tasks',
    loadChildren: './project/application/check/check.module#CheckModule',
}, {
    path: 'approvers/:userId/tasks',
    loadChildren: './project/application/approval/approval.module#ApprovalModule',
}, {
    path: 'experts/:userId/reviews',
    loadChildren: './project/application/review/review.module#ExpertReviewModule',
}, {
    path: 'teachers/:userId/info-changes',
    loadChildren: './project/info-change/form/form.module#InfoChageModule',
}, {
    path: 'checkers/:userId/info-changes',
    loadChildren: './project/info-change/check/info-change-check.module#ChangeCheckModule',
}, {
    path: 'approvers/:userId/info-changes',
    loadChildren: './project/info-change/approval/info-change-approval.module#ChangeApprovalModule',
}, {
    path: 'checkers/:userId/projects',
    loadChildren: './project/view/department/viewer.module#ProjectDepartmentModule',

}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class HuntRoutingModule { }
