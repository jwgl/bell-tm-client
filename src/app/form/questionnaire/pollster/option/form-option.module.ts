import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireFormOptionComponent } from './form-option.component';
import { FormsModule } from '@angular/forms';
import { QuestionnaireSharedModule } from '../../shared/questionnaire-shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        QuestionnaireSharedModule,
    ],
    declarations: [
        QuestionnaireFormOptionComponent,
    ],
    exports: [
        QuestionnaireFormOptionComponent,
    ],
})
export class QuestionnaireFormOptionModule { }
