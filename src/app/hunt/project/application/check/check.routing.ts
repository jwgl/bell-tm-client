import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { ApplicationCheckItemComponent } from './check-item.component';
import { ApplicationCheckListComponent } from './check-list.component';
import { TaskListComponent } from './task/task-list.component';
const routes: Routes = [
    { path: '', component: TaskListComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ApplicationCheckRoutingModule {}
