import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicDepartmentComponent } from './public-list.component';

const routes: Routes = [
    { path: '', component: PublicDepartmentComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class PublicDepartmentRoutingModule { }
