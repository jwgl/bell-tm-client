import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { LeaveSharedModule } from '../shared/leave-shared.module';
import { LeaveApprovalRoutingModule } from './leave-approval.routing';
import { LeaveApprovalListComponent } from './approval-list.component';
import { LeaveApprovalItemComponent } from './approval-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/here/approvers/${userId}/leaves', [
            { type: 'todo', label: '待处理', dateLabel: '申请时间' },
            { type: 'done', label: '已审批', dateLabel: '审批时间' },
            { type: 'next', label: '已销假', dateLabel: '审批时间' },
        ]),
        LeaveSharedModule,
        LeaveApprovalRoutingModule,
    ],
    declarations: [
        LeaveApprovalListComponent,
        LeaveApprovalItemComponent,
    ],
})
export class LeaveApprovalModule { }

