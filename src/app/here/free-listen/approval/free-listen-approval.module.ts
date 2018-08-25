import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { FreeListenSharedModule } from '../shared/free-listen-shared.module';
import { FreeListenApprovalRoutingModule } from './free-listen-approval.routing';
import { FreeListenApprovalListComponent } from './approval-list.component';
import { FreeListenApprovalItemComponent } from './approval-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/here/approvers/${userId}/freeListens', [
            { type: 'todo', label: '待审批', dateLabel: '审核时间' },
            { type: 'done', label: '已审批', dateLabel: '审批时间' },
            { type: 'tobe', label: '未审核', dateLabel: '申请时间' },
        ]),
        FreeListenApprovalRoutingModule,
        FreeListenSharedModule,
    ],
    declarations: [
        FreeListenApprovalListComponent,
        FreeListenApprovalItemComponent,
    ],
})
export class FreeListenApprovalModule { }
