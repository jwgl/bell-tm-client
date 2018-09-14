import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'users/:userId/agreements',
    loadChildren: './agreement/form/form.module#AgreementFormModule',
}, {
    path: 'agreements',
    loadChildren: './agreement/public/public.module#PublicModule',
}, {
    path: 'departments/:departmentId/agreements',
    loadChildren: './agreement/public/dept/public-department.module#PubliDepartmentcModule',
}, {
    path: 'users/:userId/universities',
    loadChildren: './agreement/university/form.module#UniversityModule',
}, {
    path: 'departments/:departmentId/awards',
    loadChildren: './award/form/award.module#AwardFormModule',
}, {
    path: 'students/:userId/applications',
    loadChildren: './award/application/form/form.module#ApplicationFormModule',
}, {
    path: 'checkers/:userId/applications',
    loadChildren: './award/application/approval/approval.module#ApplicationApprovalModule',
}, {
    path: 'checkers/:userId/papers',
    loadChildren: './award/application/paper-mentor/paper-mentor.module#PaperMentorModule',
}, {
    path: 'mentors/:userId/papers',
    loadChildren: './award/application/paper-approval/approval.module#PaperApprovalModule',
}, {
    path: 'departments/:departmentId/students',
    loadChildren: './students/form/form.module#StudentAbroadFormModule',
}, {
    path: 'settings/users',
    loadChildren: './settings/department/form/form.module#DeptAdminFormModule',
}, {
    path: 'departments/:departmentId/mentors',
    loadChildren: './settings/mentor/form/form.module#MentorFormModule',
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class DualdegreeRoutingModule { }
