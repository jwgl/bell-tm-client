import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptRoutingModule } from './asset-form.routing';
import { ReceiptFormListModule } from './list/from-list.module';
import { ReceiptFormEditorModule } from './editor/form-editor.module';
import { AssetFormService } from './form.service';

@NgModule({
    imports: [
        CommonModule,
        ReceiptRoutingModule,
        ReceiptFormListModule,
        ReceiptFormEditorModule,
    ],
    providers: [
        AssetFormService,
        { provide: 'RECEIPT_FORM_API_URL', useValue: '/api/asset/users/${userId}/receiptForms' },
    ],
})
export class ReceiptModule { }
