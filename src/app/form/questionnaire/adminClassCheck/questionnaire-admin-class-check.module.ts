import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { QuestionnaireSharedModule } from '../shared/questionnaire-shared.module';
import { QuestionnaireAdminClassCheckRoutingModule } from './questionnaire-admin-class-check.routing';
import { QuestionnaireCheckListComponent } from './check-list.component';
import { QuestionnaireCheckItemComponent } from './check-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/form/supervisors/${userId}/questionnaires', [
            { type: 'todo', label: '待审核', dateLabel: '申请时间' },
            { type: 'done', label: '已审核', dateLabel: '审核时间' },
        ]),
        QuestionnaireSharedModule,
        QuestionnaireAdminClassCheckRoutingModule,
    ],
    declarations: [
        QuestionnaireCheckListComponent,
        QuestionnaireCheckItemComponent,
    ],
})
export class QuestionnaireAdminClassCheckModule { }
