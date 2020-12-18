import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AreaListComponent } from './list/form-list.component';
import { TransferFormItemComponent } from './transfer_form/transfer-form-item.component';
import { TransferFormListComponent } from './transfer_form/transfer-form-list.component';
import { AssetItemComponent } from './item/item.component';

const routes: Routes = [
    { path: '', redirectTo: 'assets', pathMatch: 'full' },
    { path: 'assets', component: AreaListComponent },
    { path: 'assets/:id', component: AssetItemComponent },
    { path: 'forms', component: TransferFormListComponent },
    { path: 'forms/:id', component: TransferFormItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AreaRoutingModule { }
