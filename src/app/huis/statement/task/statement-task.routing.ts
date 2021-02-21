import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatementTaskListComponent } from './task-list.component';
import { StatementTaskItemComponent } from './task-item.component';
import { StatementFormEditorComponent } from '../form/editor/form-editor.component';
import { EditMode } from 'core/constants';

const routes: Routes = [{
    path: '',
    component: StatementTaskListComponent,
    children: [{
        path: ':id',
        component: StatementTaskItemComponent
    }, {
        path: ':taskId/edit',
        component: StatementFormEditorComponent,
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
export class StatementTaskRoutingModule { }
