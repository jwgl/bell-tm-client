import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireSharedModule } from '../../shared/questionnaire-shared.module';
import { QuestionnaireResponseComponent } from './questionnaire-response.component';
import { QuestionresponseComponent } from './question-response.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FontAwesomeModule,
        ClipboardModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        QuestionnaireSharedModule,
    ],
    declarations: [
        QuestionnaireResponseComponent,
        QuestionresponseComponent,
    ],
    exports: [
        QuestionnaireResponseComponent,
    ],
})
export class QuestionnaireResponseModule { }
