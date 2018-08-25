import { Component } from '@angular/core';

import { ReissueOrderService } from '../reissue-order.service';

@Component({
    styleUrls: ['order-list.component.scss'],
    templateUrl: 'order-list.component.html',
})
export class ReissueOrderListComponent {
    items: any[];
    totalCount: number;
    max = 10;

    constructor(private service: ReissueOrderService) {
        this.loadList(0);
    }

    loadList(offset: number) {
        this.service.loadListByPage(offset, this.max).subscribe(data => {
            this.totalCount = data.totalCount;
            this.items = data.items;
        });
    }
}
