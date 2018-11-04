import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';

import { QuestionnaireSharedModule } from '../../shared/questionnaire-shared.module';
import { QuestionnaireItemComponent } from './questionnaire-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        QuestionnaireSharedModule,
    ],
    declarations: [
        QuestionnaireItemComponent,
    ],
    exports: [
        QuestionnaireItemComponent,
    ],
})
export class QuestionnaireItemModule { }
