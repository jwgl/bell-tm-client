import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingTaskListComponent } from './task-list.component';
import { BookingTaskItemComponent } from './task-item.component';
import { BookingFormEditorComponent } from '../form/editor/form-editor.component';
import { EditMode } from 'core/constants';

const routes: Routes = [{
    path: '',
    component: BookingTaskListComponent,
    children: [{
        path: ':id',
        component: BookingTaskItemComponent
    }, {
        path: ':taskId/edit',
        component: BookingFormEditorComponent,
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
export class BookingTaskRoutingModule { }
