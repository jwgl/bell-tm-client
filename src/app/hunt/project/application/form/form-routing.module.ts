import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { EditMode } from 'core/constants';

import { ProjectFormEditorComponent } from './editor/form-editor.component';
import { ProjectItemComponent } from './item/item.component';
import { ProjectListComponent } from './list/form-list.component';
import { TaskItemComponent } from './reviewtask/item';
import { TaskListComponent } from './reviewtask/list';

const routes: Routes = [
    { path: '', component: TaskListComponent},
    { path: 'taskList/:id', component: TaskItemComponent },
    { path: 'list', component: ProjectListComponent },
    { path: 'create/:reviewTaskId', component: ProjectFormEditorComponent, data: { mode: EditMode.Create }},
    { path: ':id/edit', component: ProjectFormEditorComponent, data: { mode: EditMode.Edit }},
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
export class RoutingModule {}
