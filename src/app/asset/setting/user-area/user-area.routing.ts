import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { UserAreaListComponent } from './list/form-list.component';
import { UserAreaEditorComponent } from './editor/form-editor.component';

const routes: Routes = [
    { path: '', component: UserAreaListComponent },
    { path: 'editor', component: UserAreaEditorComponent, data: { mode: EditMode.Create } },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class UserAreaRoutingModule { }
