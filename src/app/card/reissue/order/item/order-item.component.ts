import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonDialog } from 'core/common-dialogs';

import { ReissueOrderService } from '../reissue-order.service';
import { ReissueOrder } from '../reissue-order.model';

@Component({
    templateUrl: 'order-item.component.html',
})
export class ReissueOrderItemComponent {
    vm: ReissueOrder;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: ReissueOrderService,
        @Inject('REISSUE_ORDER_API_URL')
        public reissuesOrderApiUrl: string,
    ) {
        this.route.params.subscribe(params => {
            this.loadItem(+params['id']);
        });
    }

    loadItem(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            this.vm = ReissueOrder.fromDto(dto);
        });
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.vm.id).subscribe(() => {
                this.router.navigate(['../'], { relativeTo: this.route });
            });
        });
    }
}
