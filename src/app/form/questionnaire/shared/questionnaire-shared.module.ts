import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireFormViewerComponent } from './questionnaire-form-viewer.component';
import { QuestionFormViewerComponent } from './question-form-viewer.component';
import { QuestionnairePreviewComponent } from './questionnaire-preview.component';
import { QuestionPreviewComponent } from './question-preview.component';
import { QuestionnaireTypeTextPipe } from './questionnaire-type.pipe';
import { UserScopeTextPipe } from './user-scope.pipe';
import { SurveyScopeTextPipe } from './survey-scope.pipe';
import { RespondentTypeTextPipe } from './respondent-type.pipe';

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
        QuestionnaireTypeTextPipe,
        UserScopeTextPipe,
        SurveyScopeTextPipe,
        RespondentTypeTextPipe,
    ],
    exports: [
        QuestionnaireFormViewerComponent,
        QuestionnairePreviewComponent,
        QuestionnaireTypeTextPipe,
        UserScopeTextPipe,
        SurveyScopeTextPipe,
        RespondentTypeTextPipe,
    ],
})
export class QuestionnaireSharedModule { }
