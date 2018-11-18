import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MisconductApprovalItemComponent } from './item/form-item.component';
import { MisconductApprovalListComponent } from './list/form-list.component';
import { MisconductApprovalComponent } from './misconduct-approval.component';

const routes: Routes = [{
    path: '',
    component: MisconductApprovalComponent,
    children: [{
        path: '',
        redirectTo: 's/0',
        pathMatch: 'full'
    }, {
        path: 's/:status',
        component: MisconductApprovalListComponent,
    }, {
        path: 's/:status/:id',
        component: MisconductApprovalItemComponent,
    }],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class MisconductApprovalRoutingModule { }
