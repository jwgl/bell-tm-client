import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';
import { Workflow2Module } from 'core/workflow2';

import { OperationSharedModule } from '../shared/operation-shared.module';
import { OperationTaskRoutingModule } from './operation-task.routing';
import { OperationTaskListComponent } from './task-list.component';
import { OperationTaskItemComponent } from './task-item.component';
import { OperationTaskService } from './operation-task.service';
import { OperationStepService } from './operation-step.service';
import { OperationFormEditorModule } from '../form/editor/form-editor.module';
import { IconModule } from 'core/icon';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        IconModule,
        // Workflow2Module.forReview('/api/huis/users/${userId}/bookingTasks'),
        OperationTaskRoutingModule,
        OperationSharedModule,
        OperationFormEditorModule
    ],
    declarations: [
        OperationTaskListComponent,
        OperationTaskItemComponent,
    ],
    providers: [
        OperationTaskService,
        OperationStepService,
        { provide: 'OPERATION_TASK_API_URL', useValue: '/api/huis/users/${userId}/operationTasks' },
        { provide: 'OPERATION_STEP_API_URL', useValue: '/api/huis/users/${userId}/operationSteps' },
    ],
})
export class OperationTaskModule { }
