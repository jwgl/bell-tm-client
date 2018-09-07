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
