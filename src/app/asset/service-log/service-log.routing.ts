import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { ServiceLogFormComponent } from './editor/form-editor.component';
import { ServiceLogFormListComponent } from './list/form-list.component';
import { ServiceLogItemComponent } from './item/item.component';

const routes: Routes = [
    { path: '', component: ServiceLogFormListComponent },
    { path: 'editor', component: ServiceLogFormComponent, data: { mode: EditMode.Create } },
    { path: ':id/edit', component: ServiceLogFormComponent, data: { mode: EditMode.Edit } },
    { path: ':id', component: ServiceLogItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ServiceLogRoutingModule { }
