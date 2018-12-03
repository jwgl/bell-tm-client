import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationCheckItemComponent } from './check-item.component';
import { ApplicationCheckListComponent } from './check-list.component';
import { TaskListComponent } from './task/task-list.component';
import { TaskItemComponent } from './task/task-item';
const routes: Routes = [
    { path: '', component: TaskListComponent },
    { path: ':taskId/:type/applications/:id', component: ApplicationCheckItemComponent },
    { path: ':taskId/:type', component: ApplicationCheckListComponent },
    { path: ':taskId', component: TaskItemComponent },
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
