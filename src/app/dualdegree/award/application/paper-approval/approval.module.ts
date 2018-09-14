import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';

import { UploaderModule } from '../../../shared/uploader/uploader.module';
import { ApplicationSharedModule } from '../shared/application-shared.module';
import { WorkFlowFinishModule } from '../shared/finish-dialog/finish.module';
import { ApplicationApprovalRoutingModule } from './approval.routing';

import { PaperApprovalItemComponent } from './approval-item.component';
import { PaperApprovalListComponent } from './approval-list.component';
import { PaperApprovalService } from './approval.service';
import { UploaderDialog } from './uploader.dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        WorkflowModule,
        WorkflowModule.forReview('/api/dualdegree/mentors/${userId}/papers', [
            { type: 'todo', label: '论文待审', dateLabel: '申请时间' },
            { type: 'done', label: '论文已审', dateLabel: '审核时间' },
        ]),
        ApplicationSharedModule,
        ApplicationApprovalRoutingModule,
        UploaderModule,
        WorkFlowFinishModule,
    ],
    declarations: [
        PaperApprovalListComponent,
        PaperApprovalItemComponent,
        UploaderDialog,
    ],
    providers: [
        Dialog,
        PaperApprovalService,
        {provide: 'APPROVAL_API_URL', useValue: '/api/dualdegree/mentors/${userId}/papers'},
    ],
    entryComponents: [
        UploaderDialog,
    ],
})
export class PaperApprovalModule {}
