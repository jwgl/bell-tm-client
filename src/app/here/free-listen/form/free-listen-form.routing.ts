import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { FreeListenFormEditorComponent } from './editor/form-editor.component';
import { FreeListenFormItemComponent } from './item/form-item.component';
import { FreeListenFormListComponent } from './list/form-list.component';

const routes: Routes = [{
    path: '',
    component: FreeListenFormListComponent,
}, {
    path: 'create',
    component: FreeListenFormEditorComponent,
    data: { mode: EditMode.Create },
}, {
    path: ':id/edit',
    component: FreeListenFormEditorComponent,
    data: { mode: EditMode.Edit }
}, {
    path: ':id',
    component: FreeListenFormItemComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class FreeListenFormRoutingModule { }
