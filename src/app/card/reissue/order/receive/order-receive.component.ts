import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReissueOrderService } from '../reissue-order.service';
import { ReissueOrder } from '../reissue-order.model';

@Component({
    templateUrl: 'order-receive.component.html',
})
export class ReissueOrderReceiveComponent {
    vm: ReissueOrder;

    constructor(
        private route: ActivatedRoute,
        private service: ReissueOrderService,
    ) {
        this.route.params.subscribe(params => {
            this.loadItem(parseInt(params['id'], 10));
        });
    }

    loadItem(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            this.vm = ReissueOrder.fromDto(dto);
        });
    }

    receive(item: any, checked: boolean) {
        this.service.receive(this.vm.id, item.formId, checked).subscribe(result => {
            item.status = result.status;
        });
    }

    receiveAll(items: any[], checked: boolean) {
        this.service.receiveAll(this.vm.id, checked).subscribe(result => {
            items.forEach(item => item.status = result.status);
        });
    }
}
