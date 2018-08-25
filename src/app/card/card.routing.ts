import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'students/:userId/reissues',
    loadChildren: './reissue/form/reissue-form.module#ReissueFormModule',
}, {
    path: 'approvers/:userId/reissues',
    loadChildren: './reissue/approval/reissue-approval.module#ReissueApprovalModule',
}, {
    path: 'reissueOrders',
    loadChildren: './reissue/order/reissue-order.module#ReissueOrderModule',
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class CardRoutingModule { }
