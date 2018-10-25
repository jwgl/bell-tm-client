import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';

import { PipesModule } from '../../../settings/shared/common-pipes';

import { ProjectFormViewerModule } from '../form/shared/form-viewer.module';
import { ApplicationCheckRoutingModule } from './check.routing';

import { ApplicationCheckItemComponent } from './check-item.component';
import { ApplicationCheckListComponent } from './check-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        WorkflowModule,
        WorkflowModule.forReview('/api/hunt/checkers/${userId}/applications', [
            { type: 'todo', label: '待审核', dateLabel: '申请时间' },
            { type: 'done', label: '已审', dateLabel: '审核时间' },
        ]),
        ProjectFormViewerModule,
        ApplicationCheckRoutingModule,
        PipesModule,
    ],
    declarations: [
        ApplicationCheckListComponent,
        ApplicationCheckItemComponent,
    ],
    providers: [
        Dialog,
        { provide: 'CHECK_API_URL', useValue: '/api/hunt/checkers/${userId}/applications' },
    ],
})
export class ProjectCheckModule { }
