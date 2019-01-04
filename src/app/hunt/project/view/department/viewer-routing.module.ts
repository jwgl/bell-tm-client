import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { ProjectDepartmentItemComponent } from './item/project-item.component';
import { ProjectDepartmentListComponent } from './list/project-list.component';
const routes: Routes = [
    { path: '', component: ProjectDepartmentListComponent },
    { path: ':id', component: ProjectDepartmentItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ProjectDepartmentRoutingModule { }
