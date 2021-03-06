import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApprovalItemComponent } from './item/approval-item.component';
import { ApprovalListComponent } from './list/approval-list.component';
const routes: Routes = [
    { path: '', redirectTo: 'list/tobe', pathMatch: 'full', },
    { path: 'list/done', component: ApprovalListComponent, data: { mode: 'done' } },
    { path: 'list/tobe', component: ApprovalListComponent, data: { mode: 'tobe' } },
    { path: ':id', component: ApprovalItemComponent },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ApprovalRoutingModule { }
