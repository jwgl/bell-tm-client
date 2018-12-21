import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationCheckItemComponent } from './check-item.component';
import { ApplicationCheckListComponent } from './check-list.component';
import { TaskListComponent } from './task/task-list.component';
import { TaskItemComponent } from './task/task-item';

const routes: Routes = [
    { path: '', component: TaskListComponent },
    { path: ':taskId/:type/applications/:id', component: ApplicationCheckItemComponent },
    {
        path: ':taskId',
        component: TaskItemComponent,
        children: [{
            path: '', redirectTo: '0', pathMatch: 'full'
        }, {
            path: ':reviewType',
            children: [{
                path: '', redirectTo: 'todo', pathMatch: 'full'
            }, {
                path: ':type',
                component: ApplicationCheckListComponent,
            }],
        }],
    },
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
