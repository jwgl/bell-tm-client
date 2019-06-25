import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'students/:userId/reissues',
    loadChildren: () => import('./reissue/form/reissue-form.module').then(m => m.ReissueFormModule),
}, {
    path: 'approvers/:userId/reissues',
    loadChildren: () => import('./reissue/approval/reissue-approval.module').then(m => m.ReissueApprovalModule),
}, {
    path: 'reissueOrders',
    loadChildren: () => import('./reissue/order/reissue-order.module').then(m => m.ReissueOrderModule),
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
