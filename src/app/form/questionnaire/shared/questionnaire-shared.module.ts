import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireFormViewerComponent } from './questionnaire-form-viewer.component';
import { QuestionFormViewerComponent } from './question-form-viewer.component';
import { QuestionnairePreviewComponent } from './questionnaire-preview.component';
import { QuestionPreviewComponent } from './question-preview.component';
import { SurveyTypeTextPipe } from './survey-type.pipe';
import { SurveyScopeTextPipe } from './survey-scope.pipe';
import { UserScopeTextPipe } from './user-scope.pipe';
import { RespondentTypeTextPipe } from './respondent-type.pipe';
import { ResponseVisibilityTextPipe } from './response-visibility.pipe';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        CommonDirectivesModule,
    ],
    declarations: [
        QuestionnaireFormViewerComponent,
        QuestionFormViewerComponent,
        QuestionnairePreviewComponent,
        QuestionPreviewComponent,
        SurveyTypeTextPipe,
        SurveyScopeTextPipe,
        RespondentTypeTextPipe,
        UserScopeTextPipe,
        ResponseVisibilityTextPipe,
    ],
    exports: [
        QuestionnaireFormViewerComponent,
        QuestionnairePreviewComponent,
        SurveyScopeTextPipe,
        SurveyTypeTextPipe,
        RespondentTypeTextPipe,
        UserScopeTextPipe,
        ResponseVisibilityTextPipe,
    ],
})
export class QuestionnaireSharedModule { }
