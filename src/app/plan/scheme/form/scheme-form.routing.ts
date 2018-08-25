import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { SchemeFormListComponent } from './list/form-list.component';
import { SchemeFormItemComponent } from './item/form-item.component';
import { SchemeFormEditorComponent } from './editor/form-editor.component';

const routes: Routes = [{
    path: '',
    component: SchemeFormListComponent
}, {
    path: 'create',
    component: SchemeFormEditorComponent,
    data: { mode: EditMode.Create },
}, {
    path: ':id/edit',
    component: SchemeFormEditorComponent,
    data: { mode: EditMode.Edit },
}, {
    path: ':id/revise',
    component: SchemeFormEditorComponent,
    data: { mode: EditMode.Revise },
}, {
    path: ':id',
    component: SchemeFormItemComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class SchemeFormRoutingModule { }
