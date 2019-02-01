import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { ProjectDepartmentItemComponent } from './item/project-item.component';
import { ProjectDepartmentListComponent } from './list/project-list.component';
import { ChangeFormEditorComponent } from './replace-principal/form-editor.component';
import { ChangeItemComponent } from './replace-principal/form-item.component';
import { ChangeListComponent } from './replace-principal/form-list.component';
const routes: Routes = [
    { path: '', component: ProjectDepartmentListComponent },
    { path: 'replace-principal', component: ChangeListComponent },
    { path: ':id/replace-principal/create', component: ChangeFormEditorComponent, data: { mode: EditMode.Create } },
    { path: ':projectId/replace-principal/:id', component: ChangeItemComponent },
    { path: ':id', component: ProjectDepartmentItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ProjectDepartmentRoutingModule { }
