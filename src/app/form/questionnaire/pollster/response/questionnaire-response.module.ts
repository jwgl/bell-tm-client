import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { IconModule } from 'core/icon';

import { QuestionnaireSharedModule } from '../../shared/questionnaire-shared.module';
import { QuestionnaireResponseComponent } from './questionnaire-response.component';
import { QuestionnaireRespondentsComponent } from './questionnaire-respondents.component';
import { QuestionResponseComponent } from './question-response.component';
import { BallotQuestionResponseComponent } from './ballot-question-response.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ClipboardModule,
        IconModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        QuestionnaireSharedModule,
    ],
    declarations: [
        QuestionnaireResponseComponent,
        QuestionnaireRespondentsComponent,
        QuestionResponseComponent,
        BallotQuestionResponseComponent,
    ],
    exports: [
        QuestionnaireResponseComponent,
    ],
})
export class QuestionnaireResponseModule { }
