import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';

import { PipesModule } from '../../../settings/shared/common-pipes';

import { ProjectFormViewerModule } from '../form/shared/form-viewer.module';
import { ApplicationApprovalRoutingModule } from './approval.routing';

import { ApplicationApprovalItemComponent } from './approval-item.component';
import { ApplicationApprovalListComponent } from './approval-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        WorkflowModule,
        WorkflowModule.forReview('/api/hunt/approvers/${userId}/applications', [
            { type: 'todo', label: '待审核', dateLabel: '申请时间' },
            { type: 'done', label: '已审', dateLabel: '审核时间' },
        ]),
        ProjectFormViewerModule,
        ApplicationApprovalRoutingModule,
        PipesModule,
    ],
    declarations: [
        ApplicationApprovalListComponent,
        ApplicationApprovalItemComponent,
    ],
    providers: [
        Dialog,
        { provide: 'APPROVAL_API_URL', useValue: '/api/hunt/approvers/${userId}/applications' },
    ],
})
export class ProjectApprovalModule { }
