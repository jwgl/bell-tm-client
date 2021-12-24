import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { CenterService } from './center.service';
import { CenterRoutingModule } from './center.routing';
import { CenterListModule } from './list/from-list.module';
import { AssetItemModule } from './item/item.module';
import { AssetEditorDialog } from './item/asset-editor.dialog';
import { TransferFormService } from './transfer.service';
import { TransferFormListModule } from './scrap_form/transfer-form.module';
import { TransferItemModule } from './scrap_form/item.module';

@NgModule({
    imports: [
        CommonModule,
        CenterRoutingModule,
        FormsModule,
        CommonDirectivesModule,
        CenterListModule,
        AssetItemModule,
        TransferFormListModule,
        TransferItemModule,
    ],
    declarations: [
        AssetEditorDialog,
    ],
    entryComponents: [
        AssetEditorDialog,
    ],
    providers: [
        Dialog,
        CenterService,
        TransferFormService,
        { provide: 'CENTER_API_URL', useValue: '/api/asset/users/${userId}/centers' },
        { provide: 'SCRAP_API_URL', useValue: '/api/asset/users/${userId}/scraps' },
        { provide: 'HINDFIELD_API_URL', useValue: '/api/asset/users/${userId}/hindFields' },
    ],
})
export class CenterModule { }
