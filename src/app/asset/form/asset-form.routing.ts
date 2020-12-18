import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { ReceiptFormListComponent } from './list/form-list.component';
import { ReceiptFormEditorComponent } from './editor/form-editor.component';
import { ReceiptItemComponent } from './item/item.component';

const routes: Routes = [
    { path: '', component: ReceiptFormListComponent },
    { path: 'editor', component: ReceiptFormEditorComponent, data: { mode: EditMode.Create } },
    { path: ':id/edit', component: ReceiptFormEditorComponent, data: { mode: EditMode.Edit } },
    { path: ':id', component: ReceiptItemComponent},

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
