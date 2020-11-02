import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { PlaceListComponent } from './list/form-list.component';
import { PlaceFormEditorComponent } from './editor/form-editor.component';

const routes: Routes = [
    { path: '', component: PlaceListComponent },
    { path: 'editor', component: PlaceFormEditorComponent, data: { mode: EditMode.Create }}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class PlaceRoutingModule { }
