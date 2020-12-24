import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAreaListComponent } from './list/form-list.component';

const routes: Routes = [
    { path: '', component: UserAreaListComponent },
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
