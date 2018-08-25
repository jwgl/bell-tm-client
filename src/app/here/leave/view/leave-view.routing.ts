import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LeaveViewComponent } from './leave-view.component';

const routes: Routes = [
    { path: ':id', component: LeaveViewComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class LeaveViewRoutingModule { }
