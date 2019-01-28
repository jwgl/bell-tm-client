import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { ProjectItemComponent } from './item/project-item.component';
import { ProjectListComponent } from './list/project-list.component';
const routes: Routes = [
    { path: '', component: ProjectListComponent },
    { path: ':id', component: ProjectItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ProjectRoutingModule { }
