import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireFormViewerComponent } from './questionnaire-form-viewer.component';
import { QuestionnairePreviewComponent } from './questionnaire-preview.component';
import { QuestionnaireRespondentsComponent } from './questionnaire-respondents.component';
import { QuestionnaireFooterComponent } from './questionnaire-footer.component';
import { QuestionFormViewerComponent } from './question-form-viewer.component';
import { BallotQuestionFormViewerComponent } from './ballot-question-form-viewer.component';
import { QuestionPreviewComponent } from './question-preview.component';
import { BallotQuestionPreviewComponent } from './ballot-question-preview.component';
import { SurveyTypeTextPipe } from './survey-type.pipe';
import { SurveyScopeTextPipe } from './survey-scope.pipe';
import { UserScopeTextPipe } from './user-scope.pipe';
import { RespondentTypeTextPipe } from './respondent-type.pipe';
import { ResponseVisibilityTextPipe } from './response-visibility.pipe';
import { QuestionTypeTextPipe } from './question-type.pipe';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        CommonDirectivesModule,
        FontAwesomeModule,
    ],
    declarations: [
        QuestionnaireFormViewerComponent,
        QuestionnaireRespondentsComponent,
        QuestionnaireFooterComponent,
        QuestionFormViewerComponent,
        BallotQuestionFormViewerComponent,
        QuestionnairePreviewComponent,
        BallotQuestionPreviewComponent,
        QuestionPreviewComponent,
        SurveyTypeTextPipe,
        SurveyScopeTextPipe,
        RespondentTypeTextPipe,
        UserScopeTextPipe,
        ResponseVisibilityTextPipe,
        QuestionTypeTextPipe,
    ],
    exports: [
        QuestionnaireFormViewerComponent,
        QuestionnairePreviewComponent,
        QuestionnaireRespondentsComponent,
        QuestionnaireFooterComponent,
        SurveyScopeTextPipe,
        SurveyTypeTextPipe,
        RespondentTypeTextPipe,
        UserScopeTextPipe,
        ResponseVisibilityTextPipe,
        QuestionTypeTextPipe,
    ],
})
export class QuestionnaireSharedModule { }
