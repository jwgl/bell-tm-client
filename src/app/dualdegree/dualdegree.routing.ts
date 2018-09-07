import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'agreements',
    loadChildren: './agreement/form/form.module#AgreementFormModule',
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
