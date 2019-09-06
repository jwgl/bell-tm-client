import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings, WORKFLOW_CONTAINTER_QUERYABLE } from 'core/workflow';

import { QuestionnaireApprovalListComponent } from './approval-list.component';
import { QuestionnaireApprovalItemComponent } from './approval-item.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            QuestionnaireApprovalListComponent,
            QuestionnaireApprovalItemComponent,
            WORKFLOW_CONTAINTER_QUERYABLE,
        )),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        { provide: WORKFLOW_CONTAINTER_QUERYABLE, useValue: () => ({ queryable: true }) },
    ]
})
export class QuestionnaireApprovalRoutingModule { }
