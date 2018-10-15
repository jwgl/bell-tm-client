import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireFormViewerComponent } from './questionnaire-form-viewer.component';
import { QuestionViewerComponent } from './question-form-viewer.component';
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
        QuestionViewerComponent,
        UserScopeTextPipe,
        SurveyScopeTextPipe,
        RespondentTypeTextPipe,
    ],
    exports: [
        QuestionnaireFormViewerComponent,
        UserScopeTextPipe,
    ],
})
export class QuestionnaireSharedModule { }
