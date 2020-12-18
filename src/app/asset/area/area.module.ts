import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaService } from './area.service';
import { TransferFormService } from './transfer.service';
import { AreaRoutingModule } from './area.routing';
import { AreaListModule } from './list/from-list.module';
import { TransferFormListModule } from './transfer_form/transfer-form.module';
import { TransferItemModule } from './transfer_form/item.module';
import { AssetItemModule } from './item/item.module';

@NgModule({
    imports: [
        CommonModule,
        AreaRoutingModule,
        AreaListModule,
        TransferFormListModule,
        TransferItemModule,
        AssetItemModule,
    ],
    providers: [
        AreaService,
        TransferFormService,
        { provide: 'AREA_API_URL', useValue: '/api/asset/users/${userId}/areas' },
        { provide: 'TRANSFER_API_URL', useValue: '/api/asset/users/${userId}/transferForms' },
    ],
})
export class AreaModule { }
