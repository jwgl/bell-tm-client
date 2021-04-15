import { Component } from '@angular/core';

import { HistoryService } from '../cart-history.service';

@Component({
    templateUrl: 'cart-list.component.html',
})
export class CartListComponent {
    carts: any;

    constructor(
        private service: HistoryService,
    ) {
        this.service.loadList().subscribe(dto => this.carts = dto);
    }
}
