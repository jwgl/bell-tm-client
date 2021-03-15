import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { buildReviewRoutings, Workflow2Module } from 'core/workflow2';

import { OperationSharedModule } from '../shared/operation-shared.module';
import { OperationFormViewerComponent } from '../shared/form-viewer.component';
import { OperationForm } from '../shared/operation-form.model';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        OperationSharedModule,
        RouterModule.forChild(buildReviewRoutings()),
        Workflow2Module.forReview(
            '/api/huis/users/${userId}/operationTasks',
            '/api/huis/users/${userId}/operationSteps',
            OperationFormViewerComponent,
            OperationForm,
        ),
    ],
})
export class OperationTaskModule { }
