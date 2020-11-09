import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { CommonDialogsModule } from 'core/common-dialogs';
import { TmAssetCommonModule } from '../../components/asset-common.module';

import { ReceiptFormEditorComponent } from './form-editor.component';
import { ReceiptItemDialog } from './receipt-item/receipt-item.dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        TmAssetCommonModule,

    ],
    declarations: [
        ReceiptFormEditorComponent,
        ReceiptItemDialog,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        ReceiptItemDialog,
    ],
    exports: [
        ReceiptFormEditorComponent,
    ],
})
export class ReceiptFormEditorModule { }
