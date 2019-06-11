import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'users/:userId/agreements',
    loadChildren: () => import('./agreement/form/form.module').then(m => m.AgreementFormModule),
}, {
    path: 'agreements',
    loadChildren: () => import('./agreement/public/public.module').then(m => m.PublicModule),
}, {
    path: 'departments/:departmentId/agreements',
    loadChildren: () => import('./agreement/public/dept/public-department.module').then(m => m.PubliDepartmentcModule),
}, {
    path: 'users/:userId/universities',
    loadChildren: () => import('./agreement/university/form.module').then(m => m.UniversityModule),
}, {
    path: 'departments/:departmentId/awards',
    loadChildren: () => import('./award/form/award.module').then(m => m.AwardFormModule),
}, {
    path: 'students/:userId/applications',
    loadChildren: () => import('./award/application/form/form.module').then(m => m.ApplicationFormModule),
}, {
    path: 'checkers/:userId/applications',
    loadChildren: () => import('./award/application/approval/approval.module').then(m => m.ApplicationApprovalModule),
}, {
    path: 'checkers/:userId/papers',
    loadChildren: () => import('./award/application/paper-mentor/paper-mentor.module').then(m => m.PaperMentorModule),
}, {
    path: 'mentors/:userId/papers',
    loadChildren: () => import('./award/application/paper-approval/approval.module').then(m => m.PaperApprovalModule),
}, {
    path: 'departments/:departmentId/students',
    loadChildren: () => import('./students/form/form.module').then(m => m.StudentAbroadFormModule),
}, {
    path: 'settings/users',
    loadChildren: () => import('./settings/department/form/form.module').then(m => m.DeptAdminFormModule),
}, {
    path: 'departments/:departmentId/mentors',
    loadChildren: () => import('./settings/mentor/form/form.module').then(m => m.MentorFormModule),
}, {
    path: 'admin/applications',
    loadChildren: () => import('./award/application/finder/finder.module').then(m => m.FinderModule),
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class DualRoutingModule { }
