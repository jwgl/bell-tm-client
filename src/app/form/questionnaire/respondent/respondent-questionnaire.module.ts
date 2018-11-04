import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponseFormRoutingModule } from './respondent-questionnaire.routing';
import { ResponseFormService } from './respondent-questionnaire.service';
import { QuestionnaireListModule } from './list/questionnaire-list.module';
import { QuestionnaireItemModule } from './item/questionnaire-item.module';

@NgModule({
    imports: [
        CommonModule,
        ResponseFormRoutingModule,
        QuestionnaireListModule,
        QuestionnaireItemModule,
    ],
    providers: [
        ResponseFormService,
        { provide: 'RESPONDENT_QUESTIONNAIE_API_URL', useValue: '/api/form/respondents/${userId}/questionnaires' },
    ],
})
export class RespondentQuestionnaireModule { }
