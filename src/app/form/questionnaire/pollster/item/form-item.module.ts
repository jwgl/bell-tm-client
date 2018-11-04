import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';

import { CommonDialogsModule } from 'core/common-dialogs';
import { WorkflowModule } from 'core/workflow';

import { QuestionnaireSharedModule } from '../../shared/questionnaire-shared.module';
import { QuestionnaireFormItemComponent } from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ClipboardModule,
        CommonDialogsModule,
        WorkflowModule,
        QuestionnaireSharedModule,

    ],
    declarations: [
        QuestionnaireFormItemComponent,
    ],
    exports: [
        QuestionnaireFormItemComponent,
    ],
})
export class QuestionnaireFormItemModule { }
