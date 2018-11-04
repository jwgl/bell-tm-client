import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireSharedModule } from '../../shared/questionnaire-shared.module';
import { ResponseFormEditorComponent } from './form-editor.component';
import { ResponseItemEditorComponent } from './response-item-editor.component';
import { BallotResponseItemEditorComponent } from './ballot-response-item-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FontAwesomeModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        QuestionnaireSharedModule,
    ],
    declarations: [
        ResponseFormEditorComponent,
        ResponseItemEditorComponent,
        BallotResponseItemEditorComponent,
    ],
    exports: [
        ResponseFormEditorComponent,
    ],
})
export class ResponseFormEditorModule { }
