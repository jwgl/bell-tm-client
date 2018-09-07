import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';
import {WorkflowModule} from 'core/workflow';

import {UploaderModule} from '../../../shared/uploader/uploader.module';
import {ApplicationSharedModule} from '../shared/application-shared.module';
import {ApplicationApprovalRoutingModule} from './approval.routing';

import {PaperApprovalItemComponent} from './approval-item.component';
import {PaperApprovalListComponent} from './approval-list.component';
import {PaperApprovalService} from './approval.service';
import {UploaderDialog} from './uploader.dialog';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/dualdegree/approvers/${userId}/applications', [
            { type: 'todo', label: '论文待审', dateLabel: '申请时间' },
            { type: 'done', label: '论文已审', dateLabel: '审批时间' },
        ]),
        ApplicationSharedModule,
        ApplicationApprovalRoutingModule,
        UploaderModule,
    ],
    declarations: [
        PaperApprovalListComponent,
        PaperApprovalItemComponent,
        UploaderDialog,
    ],
    providers: [
        Dialog,
        PaperApprovalService,
        {provide: 'PAPERAPPROVAL_API_URL', useValue: '/api/dualdegree/approvers/${userId}/papers'},
    ],
    entryComponents: [
        UploaderDialog,
    ],
})
class PaperApprovalModule {}
