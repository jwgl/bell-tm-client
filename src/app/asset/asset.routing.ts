import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'users/:userId/places',
    loadChildren: () => import('./place/place.module').then(m => m.PlaceModule),
}, {
    path: 'users/:userId/placePublics',
    loadChildren: () => import('./public/place/place.module').then(m => m.PlacePublicModule),
}, {
    path: 'users/:userId/receiptForms',
    loadChildren: () => import('./form/asset-form.module').then(m => m.ReceiptModule),
}, {
    path: 'users/:userId/centers',
    loadChildren: () => import('./center/center.module').then(m => m.CenterModule),
}, {
    path: 'users/:userId/areas',
    loadChildren: () => import('./area/area.module').then(m => m.AreaModule),
}, {
    path: 'approvers/:userId/receiptForms',
    loadChildren: () => import('./approval/receipt/approval.module').then(m => m.ReceiptApprovalModule),
}, {
    path: 'approvers/:userId/exceptionForms',
    loadChildren: () => import('./approval/exception/approval.module').then(m => m.ExceptionApprovalModule),
}, {
    path: 'approvers/:userId/transferApproval',
    loadChildren: () => import('./center/approval/approval.module').then(m => m.TransferApprovalModule),
}, {
    path: 'models',
    loadChildren: () => import('./setting/asset-model/asset-model.module').then(m => m.AssetModelModule),
}, {
    path: 'approvers/:userId/grants',
    loadChildren: () => import('./setting/user-area/user-area.module').then(m => m.UserAreaModule),
}, {
    path: 'users/:userId/carts',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
}, {
    path: 'users/:userId/placeServices',
    loadChildren: () => import('./service-log/service-log.module').then(m => m.ServiceLogModule),
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class AssetRoutingModule { }
