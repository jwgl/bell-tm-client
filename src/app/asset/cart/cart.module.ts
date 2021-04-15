import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from './cart.service';
import { HistoryService } from './cart-history.service';
import { CartRoutingModule } from './cart.routing';
import { CartItemsModule } from './list/from-list.module';
import { CartsModule } from './history/cart-list.module';
import { HistoryItemModule } from './history-item/item.module';

@NgModule({
    imports: [
        CommonModule,
        CartRoutingModule,
        CartItemsModule,
        CartsModule,
        HistoryItemModule,
    ],
    providers: [
        CartService,
        HistoryService,
        { provide: 'CART_API_URL', useValue: '/api/asset/users/${userId}/carts' },
        { provide: 'HISTORY_API_URL', useValue: '/api/asset/users/${userId}/cartHistory' },
    ],
})
export class CartModule { }
