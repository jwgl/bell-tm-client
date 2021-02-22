import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OperationTaskListComponent } from './task-list.component';
import { OperationTaskItemComponent } from './task-item.component';
import { OperationFormEditorComponent } from '../form/editor/form-editor.component';
import { EditMode } from 'core/constants';

const routes: Routes = [{
    path: '',
    component: OperationTaskListComponent,
    children: [{
        path: ':id',
        component: OperationTaskItemComponent
    }, {
        path: ':taskId/edit',
        component: OperationFormEditorComponent,
        data: { mode: EditMode.Edit },
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
export class OperationTaskRoutingModule { }
