import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskListComponent } from './task/task-list.component';

import { ApplicationApprovalItemComponent } from './approval-item.component';
import { ApplicationApprovalListComponent } from './approval-list.component';

const routes: Routes = [
    { path: '', component: TaskListComponent },
    { path: ':taskId/:type/applications/:id', component: ApplicationApprovalItemComponent },
    { path: ':taskId/:type', component: ApplicationApprovalListComponent },
    { path: ':taskId', component: ApplicationApprovalListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ApplicationApprovalRoutingModule {}