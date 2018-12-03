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
    { path: ':reviewTaskId/applications/:id', component: ProjectItemComponent },
    // { path: 'list', component: ProjectListComponent },
    { path: ':reviewTaskId/create', component: ProjectFormEditorComponent, data: { mode: EditMode.Create }},
    { path: ':id/applications/:applicationId/edit', component: ProjectFormEditorComponent, data: { mode: EditMode.Edit }},
    { path: ':id', component: TaskItemComponent },
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
