import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Dialog } from 'core/dialogs';
import { CommonDialogsModule } from 'core/common-dialogs';
import { WorkflowModule } from 'core/workflow';

import { ReceiptFormViewerModule } from '../shared/form-viewer.module';
import { ReceiptItemComponent } from './item.component';
import { AssetFormService } from '../form.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        WorkflowModule.forSubmit(AssetFormService),
        ReceiptFormViewerModule,
    ],
    declarations: [
        ReceiptItemComponent,
    ],
    exports: [
        ReceiptItemComponent,
    ],
    providers: [
        Dialog,
    ],
})
export class ReceiptItemModule { }
