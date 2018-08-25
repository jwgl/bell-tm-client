import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { PlanSharedModule } from '../../shared/module';
import { VisionViewerModule } from '../shared/vision-viewer.module';
import { VisionApprovalRoutingModule } from './vision-approval.routing';
import { VisionApprovalListComponent } from './approval-list.component';
import { VisionApprovalItemComponent } from './approval-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/plan/approvers/${userId}/visions', [
            { type: 'todo', label: '待审批', dateLabel: '审核时间' },
            { type: 'done', label: '已审批', dateLabel: '审批时间' },
            { type: 'tobe', label: '未审核', dateLabel: '申请时间' },
        ]),
        VisionApprovalRoutingModule,
        PlanSharedModule,
        VisionViewerModule,
    ],
    declarations: [
        VisionApprovalListComponent,
        VisionApprovalItemComponent,
    ],
    providers: [
        { provide: 'SCHEMES_PUBLIC_WEB_URL', useValue: '/plan/schemes' },
    ],
})
export class VisionApprovalModule { }
