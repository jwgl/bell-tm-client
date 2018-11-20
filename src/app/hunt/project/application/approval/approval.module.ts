import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';

import { PipesModule } from '../../../settings/shared/common-pipes';

import { ProjectFormViewerModule } from '../form/shared/form-viewer.module';
import { ApplicationApprovalRoutingModule } from './approval.routing';

import { TaskListModule } from './task/task-list.module';
import { ApprovalService } from './approval.service';
import { ApplicationApprovalItemComponent } from './approval-item.component';
import { ApplicationApprovalListComponent } from './approval-list.component';
import { TeamDialog } from './expert-team.dialog';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faLockOpen, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faLock, faLockOpen, faUser);
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        WorkflowModule,
        FontAwesomeModule,
        WorkflowModule.forReview('/api/hunt/approvers/${userId}/applications', [
            { type: 'todo', label: '待审核', dateLabel: '申请时间' },
            { type: 'done', label: '已审', dateLabel: '审核时间' },
        ]),
        ProjectFormViewerModule,
        ApplicationApprovalRoutingModule,
        PipesModule,
        TaskListModule,
    ],
    declarations: [
        ApplicationApprovalListComponent,
        ApplicationApprovalItemComponent,
        TeamDialog,
    ],
    providers: [
        Dialog,
        ApprovalService,
        { provide: 'APPROVAL_API_URL', useValue: '/api/hunt/approvers/${userId}/applications' },
        { provide: 'TASK_APPROVAL_API_URL', useValue: '/api/hunt/approvers/${userId}/tasks' },
        { provide: 'TASK_API_URL', useValue: '/api/hunt/settings/tasks' },
        { provide: 'TEAM_API_URL', useValue: '/api/hunt/settings/teams' },
    ],
    entryComponents: [
        TeamDialog,
    ],
})
export class ApprovalModule { }