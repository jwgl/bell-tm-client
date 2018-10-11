import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireFormViewerComponent } from './questionnaire-form-viewer.component';
import { UserScopeTextPipe } from './user-scope.pipe';
import { QuestionViewerComponent } from './question-viewer.component';

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
    ],
    exports: [
        QuestionnaireFormViewerComponent,
        QuestionViewerComponent,
        UserScopeTextPipe,
    ],
})
export class QuestionnaireSharedModule { }
