import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CenterListComponent } from './list/form-list.component';
import { AssetItemComponent } from './item/item.component';
import { TransferFormListComponent } from './scrap_form/transfer-form-list.component';
import { TransferFormItemComponent } from './scrap_form/transfer-form-item.component';

const routes: Routes = [
    { path: '', redirectTo: 'assets', pathMatch: 'full' },
    { path: 'assets', component: CenterListComponent },
    { path: 'assets/:id', component: AssetItemComponent },
    { path: 'scraps', component: TransferFormListComponent },
    { path: 'scraps/:id', component: TransferFormItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class CenterRoutingModule { }
