import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectTeacherItemComponent } from './item/project-item.component';
import { ProjectTeacherListComponent } from './list/project-list.component';
import { FundViewComponent } from '../../application/form/fund/fund-view.component';
const routes: Routes = [
    { path: '', component: ProjectTeacherListComponent },
    { path: ':projectId/fund', component: FundViewComponent},
    { path: ':id', component: ProjectTeacherItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ProjectTeacherRoutingModule { }
