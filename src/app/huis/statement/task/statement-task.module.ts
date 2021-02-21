import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';
import { Workflow2Module } from 'core/workflow2';

import { StatementSharedModule } from '../shared/statement-shared.module';
import { StatementTaskRoutingModule } from './statement-task.routing';
import { StatementTaskListComponent } from './task-list.component';
import { StatementTaskItemComponent } from './task-item.component';
import { StatementTaskService } from './statement-task.service';
import { StatementStepService } from './statement-step.service';
import { StatementFormEditorModule } from '../form/editor/form-editor.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        // Workflow2Module.forReview('/api/huis/users/${userId}/bookingTasks'),
        StatementTaskRoutingModule,
        StatementSharedModule,
        StatementFormEditorModule
    ],
    declarations: [
        StatementTaskListComponent,
        StatementTaskItemComponent,
    ],
    providers: [
        StatementTaskService,
        StatementStepService,
        { provide: 'STATEMENT_TASK_API_URL', useValue: '/api/huis/users/${userId}/statementTasks' },
        { provide: 'STATEMENT_STEP_API_URL', useValue: '/api/huis/users/${userId}/statementSteps' },
    ],
})
export class StatementTaskModule { }
