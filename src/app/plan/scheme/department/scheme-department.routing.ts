import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchemeDepartmentItemComponent } from './item/department-item.component';
import { SchemeDepartmentListComponent } from './list/department-list.component';
import { SchemeDepartmentToesComponent } from './toes/department-toes.component';

const routes: Routes = [{
    path: '',
    component: SchemeDepartmentListComponent
}, {
    path: ':id',
    component: SchemeDepartmentItemComponent
}, {
    path: ':id/toes',
    component: SchemeDepartmentToesComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ],
})
export class SchemeDepartmentRoutingModule { }
