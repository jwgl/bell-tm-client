import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeptAdminListComponent } from './list/form-list.component';

const routes: Routes = [
    { path: '', component: DeptAdminListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class DeptAdminRoutingModule { }
