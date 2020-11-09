import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'users/:userId/places',
    loadChildren: () => import('./place/place.module').then(m => m.PlaceModule),
}, {
    path: 'users/:userId/receiptForms',
    loadChildren: () => import('./form/asset-form.module').then(m => m.ReceiptModule),
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
