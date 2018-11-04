import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { QuestionnaireSharedModule } from '../shared/questionnaire-shared.module';
import { QuestionnaireApprovalRoutingModule } from './questionnaire-approval.routing';
import { QuestionnaireApprovalListComponent } from './approval-list.component';
import { QuestionnaireApprovalItemComponent } from './approval-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/form/approvers/${userId}/questionnaires', [
            { type: 'todo', label: '待审批', dateLabel: '审核时间' },
            { type: 'done', label: '已审批', dateLabel: '审批时间' },
        ]),
        QuestionnaireApprovalRoutingModule,
        QuestionnaireSharedModule,
    ],
    declarations: [
        QuestionnaireApprovalListComponent,
        QuestionnaireApprovalItemComponent,
    ],
})
export class QuestionnaireApprovalModule { }
