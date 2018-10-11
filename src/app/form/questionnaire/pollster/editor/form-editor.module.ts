import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireSharedModule } from '../../shared/questionnaire-shared.module';
import { QuestionnaireEditorComponent } from './form-editor.component';
import { QuestionEditorComponent } from './question-editor.component';
import { QuestionOptionEditorComponent } from './question-option-editor.component';
import { QuestionOptionCreatorComponent } from './question-option-creater.component';
import { QuestionnaireUserScopeModule } from './user-scope/user-scope.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FontAwesomeModule,
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
    ],
    exports: [
        QuestionnaireEditorComponent,
    ],
})
export class QuestionnaireFormEditorModule { }
