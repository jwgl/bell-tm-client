import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { UniversityFormEditorComponent } from './editor/form-editor.component';
import { UniversityItemComponent } from './item/item.component';
import { UniversityListComponent } from './list/form-list.component';

const routes: Routes = [
    { path: '', component: UniversityListComponent },
    { path: 'editor', component: UniversityFormEditorComponent, data: { mode: EditMode.Create } },
    { path: ':id/edit', component: UniversityFormEditorComponent, data: { mode: EditMode.Edit } },
    { path: ':id', component: UniversityItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class UniversityRoutingModule { }
