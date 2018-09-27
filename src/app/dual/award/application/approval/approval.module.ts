import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';

import { ApplicationSharedModule } from '../shared/application-shared.module';
import { ApplicationApprovalRoutingModule } from './approval.routing';

import { ApplicationApprovalItemComponent } from './approval-item.component';
import { ApplicationApprovalListComponent } from './approval-list.component';
import { ApprovalService } from './approval.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/dual/checkers/${userId}/applications', [
            { type: 'todo', label: '材料待审', dateLabel: '申请时间' },
            { type: 'done', label: '材料已审', dateLabel: '审核时间' },
        ]),
        ApplicationSharedModule,
        ApplicationApprovalRoutingModule,
    ],
    declarations: [
        ApplicationApprovalListComponent,
        ApplicationApprovalItemComponent,
    ],
    providers: [
        Dialog,
        ApprovalService,
        { provide: 'APPROVAL_API_URL', useValue: '/api/dual/checkers/${userId}/applications' },
    ],
})
export class ApplicationApprovalModule { }
