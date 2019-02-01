import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TypeComponent } from './list/type-list.component';

const routes: Routes = [
    { path: '', component: TypeComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class HuntTypeRoutingModule { }
