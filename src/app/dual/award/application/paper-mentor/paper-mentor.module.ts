import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';

import { ApplicationSharedModule } from '../shared/application-shared.module';
import { WorkFlowFinishModule } from '../shared/finish-dialog/finish.module';
import { ApplicationApprovalRoutingModule } from './paper-mentor.routing';

import { PaperMentorItemComponent } from './item.component';
import { PaperMentorListComponent } from './list.component';
import { PaperMentorService } from './paper-mentor.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        WorkflowModule,
        WorkflowModule.forReview('/api/dual/checkers/${userId}/papermentors', [
            { type: 'todo', label: '待设置', dateLabel: '申请时间' },
            { type: 'done', label: '已设置', dateLabel: '审核时间' },
        ]),
        ApplicationSharedModule,
        ApplicationApprovalRoutingModule,
        WorkFlowFinishModule,
    ],
    declarations: [
        PaperMentorListComponent,
        PaperMentorItemComponent,
    ],
    providers: [
        Dialog,
        PaperMentorService,
        { provide: 'APPROVAL_API_URL', useValue: '/api/dual/checkers/${userId}/papermentors' },
    ],
})
export class PaperMentorModule { }
