import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { buildReviewRoutings, Workflow2Module } from 'core/workflow2';

import { StatementSharedModule } from '../shared/statement-shared.module';
import { StatementFormViewerComponent } from '../shared/form-viewer.component';
import { StatementForm } from '../shared/statement-form.model';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        StatementSharedModule,
        RouterModule.forChild(buildReviewRoutings()),
        Workflow2Module.forReview(
            '/api/huis/users/${userId}/statementTasks',
            '/api/huis/users/${userId}/statementSteps',
            StatementFormViewerComponent,
            StatementForm,
        ),
    ],
})
export class StatementTaskModule { }
