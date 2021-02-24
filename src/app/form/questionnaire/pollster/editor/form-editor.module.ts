import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireSharedModule } from '../../shared/questionnaire-shared.module';
import { QuestionnaireUserScopeModule } from './user-scope/user-scope.module';
import { QuestionnaireEditorComponent } from './form-editor.component';
import { QuestionEditorComponent } from './question-editor.component';
import { QuestionViewerComponent } from './question-viewer.component';
import { QuestionOptionEditorComponent } from './question-option-editor.component';
import { QuestionOptionCreatorComponent } from './question-option-creater.component';
import { BallotQuestionEditorComponent } from './ballot-question-editor.component';
import { BallotOptionEditorComponent } from './ballot-option-editor.component';
import { BallotOptionViewerComponent } from './ballot-option-viewer.component';
import { IconModule } from 'core/icon';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        IconModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        QuestionnaireSharedModule,
        QuestionnaireUserScopeModule,
    ],
    declarations: [
        QuestionnaireEditorComponent,
        QuestionEditorComponent,
        QuestionOptionEditorComponent,
        QuestionOptionCreatorComponent,
        BallotQuestionEditorComponent,
        BallotOptionEditorComponent,
        BallotOptionViewerComponent,
        QuestionViewerComponent,
    ],
    exports: [
        QuestionnaireEditorComponent,
    ],
})
export class QuestionnaireFormEditorModule { }
