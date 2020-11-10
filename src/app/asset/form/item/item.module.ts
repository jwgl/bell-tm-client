import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { WorkflowModule } from 'core/workflow';

import { ReceiptFormViewerModule } from '../shared/form-viewer.module';
import { ReceiptItemComponent } from './item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        WorkflowModule,
        ReceiptFormViewerModule,
    ],
    declarations: [
        ReceiptItemComponent,
    ],
    exports: [
        ReceiptItemComponent,
    ],
})
export class ReceiptItemModule { }
