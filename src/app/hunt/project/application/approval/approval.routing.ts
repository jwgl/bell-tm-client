import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskListComponent } from './task/task-list.component';

import { ProjectListComponent } from './administration/project-list.component';
import { ApplicationApprovalItemComponent } from './approval-item.component';
import { ApplicationApprovalListComponent } from './approval-list.component';

const routes: Routes = [
    { path: '', component: TaskListComponent },
    {
        path: ':taskId/administration',
        children: [{
            path: '', redirectTo: '3', pathMatch: 'full'
        }, {
            path: ':type',
            component: ProjectListComponent,
        }
        , {
            path: ':type/:id',
            component: ApplicationApprovalItemComponent,
        }],
    },
    { path: ':taskId/:id', component: ApplicationApprovalItemComponent },
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
export class ApplicationApprovalRoutingModule { }
