import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireFormViewerComponent } from './questionnaire-form-viewer.component';
import { QuestionnairePreviewComponent } from './questionnaire-preview.component';
import { RespondentAddressComponent } from './respondent-address.component';
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
        FormsModule,
        OverlayModule,
        CommonDirectivesModule,
    ],
    declarations: [
        QuestionnaireFormViewerComponent,
        RespondentAddressComponent,
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
        RespondentAddressComponent,
        QuestionnaireFooterComponent,
        QuestionFormViewerComponent,
        QuestionnairePreviewComponent,
        SurveyScopeTextPipe,
        SurveyTypeTextPipe,
        RespondentTypeTextPipe,
        UserScopeTextPipe,
        ResponseVisibilityTextPipe,
        QuestionTypeTextPipe,
    ],
})
export class QuestionnaireSharedModule { }
