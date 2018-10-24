import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { TaskFormEditorComponent } from './editor/form-editor.component';
import { TaskItemComponent } from './item/item.component';
import { TaskListComponent } from './list/form-list.component';

const routes: Routes = [
    { path: '', component: TaskListComponent },
    { path: 'editor', component: TaskFormEditorComponent, data: { mode: EditMode.Create } },
    { path: ':id/edit', component: TaskFormEditorComponent, data: { mode: EditMode.Edit } },
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
export class BatchRoutingModule { }
