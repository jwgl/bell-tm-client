import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReissueOrderRoutingModule } from './reissue-order.routing';
import { ReissueOrderListModule } from './list/order-list.module';
import { ReissueOrderItemModule } from './item/order-item.module';
import { ReissueOrderEditorModule } from './editor/order-editor.module';
import { ReissueOrderReceiveModule } from './receive/order-receive.module';
import { ReissueOrderService } from './reissue-order.service';

@NgModule({
    imports: [
        CommonModule,
        ReissueOrderRoutingModule,
        ReissueOrderListModule,
        ReissueOrderItemModule,
        ReissueOrderEditorModule,
        ReissueOrderReceiveModule,
    ],
    providers: [
        ReissueOrderService,
        { provide: 'REISSUE_ORDER_API_URL', useValue: '/api/card/reissueOrders' },
        { provide: 'REISSUE_API_URL', useValue: '/api/card/reissues' },
    ],
})
export class ReissueOrderModule { }
