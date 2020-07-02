import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'settings/types',
    loadChildren: () => import('./settings/type/type.module').then(m => m.HuntTypeModule),
}, {
    path: 'settings/tasks',
    loadChildren: () => import('./settings/task/task.module').then(m => m.TaskFormModule),
}, {
    path: 'settings/experts',
    loadChildren: () => import('./settings/expert/form/expert.module').then(m => m.ExpertFormModule),
}, {
    path: 'settings/checkers',
    loadChildren: () => import('./settings/checker/form/checker.module').then(m => m.CheckerFormModule),
}, {
    path: 'teachers/:userId/tasks',
    loadChildren: () => import('./project/application/form/form.module').then(m => m.ProjectModule),
}, {
    path: 'checkers/:userId/tasks',
    loadChildren: () => import('./project/application/check/check.module').then(m => m.CheckModule),
}, {
    path: 'approvers/:userId/tasks',
    loadChildren: () => import('./project/application/approval/approval.module').then(m => m.ApprovalModule),
}, {
    path: 'experts/:userId/reviews',
    loadChildren: () => import('./project/application/review/review.module').then(m => m.ExpertReviewModule),
}, {
    path: 'teachers/:userId/info-changes',
    loadChildren: () => import('./project/info-change/form/form.module').then(m => m.InfoChageModule),
}, {
    path: 'checkers/:userId/info-changes',
    loadChildren: () => import('./project/info-change/check/info-change-check.module').then(m => m.ChangeCheckModule),
}, {
    path: 'approvers/:userId/info-changes',
    loadChildren: () => import('./project/info-change/approval/info-change-approval.module').then(m => m.ChangeApprovalModule),
}, {
    path: 'checkers/:userId/projects',
    loadChildren: () => import('./project/view/department/viewer.module').then(m => m.ProjectDepartmentModule),
}, {
    path: 'directors/:userId/info-changes',
    loadChildren: () => import('./project/info-change/review/info-change-review.module').then(m => m.ChangeReviewModule),
}, {
    path: 'users/:userId/projects',
    loadChildren: () => import('./project/view/upper/viewer.module').then(m => m.ProjectModule),
}, {
    path: 'approvers/:userId/funds',
    loadChildren: () => import('./fund/fund.module').then(m => m.FundModule),
}, {
    path: 'teachers/:userId/projects',
    loadChildren: () => import('./project/view/teacher/viewer.module').then(m => m.ProjectTeachertModule),
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
