import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskListComponent } from './task/task-list.component';
import { TaskItemComponent } from './task/task-item';
import { ReviewListComponent } from './list/review-list.component';

const routes: Routes = [
    { path: '', component: TaskListComponent },
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
                component: ReviewListComponent,
            }],
        }],
    }];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ReviewRoutingModule { }
