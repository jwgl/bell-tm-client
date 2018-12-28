import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { ChangeItemComponent } from './item/item.component';
import { ChangeListComponent } from './list/form-list.component';
import { ChangeFormEditorComponent } from './editor/form-editor.component';
const routes: Routes = [
    { path: '', component: ChangeListComponent },
    { path: 'create', component: ChangeFormEditorComponent, data: { mode: EditMode.Create } },
    { path: ':id/edit', component: ChangeFormEditorComponent, data: { mode: EditMode.Edit }},
    { path: ':id', component: ChangeItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class RoutingModule { }
