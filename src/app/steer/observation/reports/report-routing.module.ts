import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartmentReportComponent } from './item/department.component';
import { ObservationReportComponent } from './item/observation-report.component';
import { RewardListComponent } from './item/reward.component';
import { TeacherSupervisedComponent } from './item/teacher-supervised.component';
import { ReportComponent } from './report.component';

const routes: Routes = [{
    path: '',
    component: ReportComponent,
    children: [
        { path: 'levels/:observer-type/department', component: DepartmentReportComponent},
        { path: 'levels/:observer-type/observer', component: ObservationReportComponent},
        { path: 'levels/:observer-type/teacher', component: TeacherSupervisedComponent},
        { path: 'levels/:observer-type/reward', component: RewardListComponent },
    ]
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ReportRoutingModule { }
