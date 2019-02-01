import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule, } from 'core/workflow';

import { PipesModule } from '../../../settings/shared/common-pipes';
import { ChangeFormViewerModule } from '../form/shared/form-viewer.module';
import { InfoChangeApprovalRoutingModule } from './info-change-approval.routing';
import { InfoChangeApprovalListComponent } from './approval-list.component';
import { InfoChangeApprovalItemComponent } from './approval-item.component';
import { ApprovalService } from './approval.service';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/hunt/approvers/${userId}/infoChanges', [
            { type: 'todo', label: '待审批', dateLabel: '审核时间' },
            { type: 'done', label: '已审批', dateLabel: '审批时间' },
            { type: 'tobe', label: '变更负责人待审', dateLabel: '审核时间' },
        ]),
        InfoChangeApprovalRoutingModule,
        PipesModule,
        ChangeFormViewerModule,
    ],
    declarations: [
        InfoChangeApprovalListComponent,
        InfoChangeApprovalItemComponent,
    ],
    providers: [
        ApprovalService,
        { provide: 'APPROVAL_API_URL', useValue: '/api/hunt/approvers/${userId}/infoChanges' },
    ],
})
export class ChangeApprovalModule { }
