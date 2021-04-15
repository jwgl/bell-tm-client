import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartItemsComponent } from './list/form-list.component';
import { CartListComponent } from './history/cart-list.component';
import { HistoryItemComponent } from './history-item/item.component';

const routes: Routes = [
    { path: '', redirectTo: 'assets', pathMatch: 'full' },
    { path: 'assets', component: CartItemsComponent },
    { path: 'history', component: CartListComponent },
    { path: 'history/:id', component: HistoryItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class CartRoutingModule { }
