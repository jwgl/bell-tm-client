import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { ReceiptFormViewerModule } from '../../form/shared/form-viewer.module';
import { ApprovalRoutingModule } from './approval.routing';
import { ApprovalListComponent } from './approval-list.component';
import { ApprovalItemComponent } from './approval-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/asset/approvers/${userId}/receiptApprovals', [
            { type: 'todo', label: '待审核', dateLabel: '提交时间' },
            { type: 'done', label: '已审核', dateLabel: '审核时间' },
        ]),
        ApprovalRoutingModule,
        ReceiptFormViewerModule,
    ],
    declarations: [
        ApprovalListComponent,
        ApprovalItemComponent,
    ],
})
export class ReceiptApprovalModule { }
