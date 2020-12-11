import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'users/:userId/places',
    loadChildren: () => import('./place/place.module').then(m => m.PlaceModule),
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
    loadChildren: () => import('./approval/approval.module').then(m => m.ReceiptApprovalModule),
}, {
    path: 'approvers/:userId/transferApproval',
    loadChildren: () => import('./center/approval/approval.module').then(m => m.TransferApprovalModule),
}, {
    path: 'models',
    loadChildren: () => import('./setting/asset-model/asset-model.module').then(m => m.AssetModelModule),
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
