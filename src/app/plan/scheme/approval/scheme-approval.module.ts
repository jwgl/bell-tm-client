import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule, } from 'core/workflow';

import { PlanSharedModule } from '../../shared/module';
import { SchemeInternalViewerModule } from '../shared/internal-viewer/scheme-viewer.module';
import { SchemeSharedModule } from '../shared/scheme.module';
import { SchemeApprovalRoutingModule } from './scheme-approval.routing';
import { SchemeApprovalListComponent } from './approval-list.component';
import { SchemeApprovalItemComponent } from './approval-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/plan/approvers/${userId}/schemes', [
            { type: 'todo', label: '待审批', dateLabel: '审核时间' },
            { type: 'done', label: '已审批', dateLabel: '审批时间' },
            { type: 'tobe', label: '未审核', dateLabel: '申请时间' },
        ]),
        SchemeApprovalRoutingModule,
        PlanSharedModule,
        SchemeInternalViewerModule,
        SchemeSharedModule,
    ],
    declarations: [
        SchemeApprovalListComponent,
        SchemeApprovalItemComponent,
    ],
})
export class SchemeApprovalModule { }
