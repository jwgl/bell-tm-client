import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkflowItemResolve, WorkflowListResolve } from 'core/workflow';

import { ApplicationCheckItemComponent } from './check-item.component';
import { ApplicationCheckListComponent } from './check-list.component';
import { TaskListComponent } from './task/task-list.component';
const routes: Routes = [
    { path: '', component: TaskListComponent },
    { path: ':taskId/:type/applications/:id', component: ApplicationCheckItemComponent },
    { path: ':taskId/:type', component: ApplicationCheckListComponent },
    { path: ':taskId', component: ApplicationCheckListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ApplicationCheckRoutingModule { }
