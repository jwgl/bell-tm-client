import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { ReissueSharedModule } from '../shared/reissue-shared.module';
import { ReissueApprovalRoutingModule } from './reissue-approval.routing';
import { ReissueApprovalListComponent } from './approval-list.component';
import { ReissueApprovalItemComponent } from './approval-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/card/approvers/${userId}/reissues', [
            { type: 'todo', label: '待审批', dateLabel: '申请时间' },
            { type: 'done', label: '已审批', dateLabel: '审批时间' },
        ]),
        ReissueApprovalRoutingModule,
        ReissueSharedModule,
    ],
    declarations: [
        ReissueApprovalListComponent,
        ReissueApprovalItemComponent,
    ],
})
export class ReissueApprovalModule { }
