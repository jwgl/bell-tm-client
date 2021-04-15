import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { OperationFormEditorComponent } from './editor/form-editor.component';
import { OperationFormItemComponent } from './item/form-item.component';
import { OperationFormListComponent } from './list/form-list.component';

const routes: Routes = [{
    path: '',
    component: OperationFormListComponent,
}, {
    path: ':id/edit',
    component: OperationFormEditorComponent,
}, {
    path: ':id',
    component: OperationFormItemComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class OperationFormRoutingModule { }
