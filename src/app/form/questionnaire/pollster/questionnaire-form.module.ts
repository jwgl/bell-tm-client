import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { QuestionnaireFormRoutingModule } from './questionnaire-form.routing';
import { QuestionnaireFormService } from './questionnaire-form.service';
import { QuestionnaireFormListModule } from './list/form-list.module';
import { QuestionnaireFormItemModule } from './item/form-item.module';
import { QuestionnaireFormOptionModule } from './option/form-option.module';
import { QuestionnaireFormEditorModule } from './editor/form-editor.module';
import { QuestionnaireResponseModule } from './response/questionnaire-response.module';

@NgModule({
    imports: [
        CommonModule,
        WorkflowModule.forSubmit(QuestionnaireFormService),
        QuestionnaireFormRoutingModule,
        QuestionnaireFormListModule,
        QuestionnaireFormItemModule,
        QuestionnaireFormOptionModule,
        QuestionnaireFormEditorModule,
        QuestionnaireResponseModule,
    ],
    providers: [
        QuestionnaireFormService,
        { provide: 'QUESTIONNAIRE_FORM_API_URL', useValue: '/api/form/pollsters/${userId}/questionnaires' },
    ],
})
export class QuestionnaireFormModule { }
