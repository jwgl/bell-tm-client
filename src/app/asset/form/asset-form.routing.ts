import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { ReceiptFormListComponent } from './list/form-list.component';
import { ReceiptFormEditorComponent } from './editor/form-editor.component';

const routes: Routes = [
    { path: '', component: ReceiptFormListComponent },
    { path: 'editor', component: ReceiptFormEditorComponent, data: { mode: EditMode.Create } },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ReceiptRoutingModule { }
