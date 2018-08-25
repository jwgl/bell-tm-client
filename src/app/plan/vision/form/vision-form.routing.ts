import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { VisionFormListComponent } from './list/form-list.component';
import { VisionFormItemComponent } from './item/form-item.component';
import { VisionFormEditorComponent } from './editor/form-editor.component';

const routes: Routes = [{
    path: '',
    component: VisionFormListComponent
}, {
    path: 'create',
    component: VisionFormEditorComponent,
    data: { mode: EditMode.Create },
}, {
    path: ':id/edit',
    component: VisionFormEditorComponent,
    data: { mode: EditMode.Edit },
}, {
    path: ':id/revise',
    component: VisionFormEditorComponent,
    data: { mode: EditMode.Revise },
}, {
    path: ':id',
    component: VisionFormItemComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class VisionFormRoutingModule { }
