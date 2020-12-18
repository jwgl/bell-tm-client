import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Dialog } from 'core/dialogs';
import { CommonDialogsModule } from 'core/common-dialogs';
import { WorkflowModule } from 'core/workflow';

import { TransferFormItemComponent } from './transfer-form-item.component';
import { TransferFormViewerModule } from '../shared/form-viewer.module';
import { TransferFormService } from '../transfer.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        WorkflowModule.forSubmit(TransferFormService),
        TransferFormViewerModule,
    ],
    declarations: [
        TransferFormItemComponent,
    ],
    exports: [
        TransferFormItemComponent,
    ],
    providers: [
        Dialog,
    ],
})
export class TransferItemModule { }
