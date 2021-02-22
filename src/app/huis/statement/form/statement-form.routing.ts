import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { StatementFormEditorComponent } from './editor/form-editor.component';
import { StatementFormItemComponent } from './item/form-item.component';
import { StatementFormListComponent } from './list/form-list.component';

const routes: Routes = [{
    path: '',
    component: StatementFormListComponent,
}, {
    path: 'create',
    component: StatementFormEditorComponent,
    data: { mode: EditMode.Create },
}, {
    path: ':id/edit',
    component: StatementFormEditorComponent,
    data: { mode: EditMode.Edit },
}, {
    path: ':id',
    component: StatementFormItemComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class StatementFormRoutingModule { }
