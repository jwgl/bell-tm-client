import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireFormListComponent } from './form-list.component';
import { QuestionnaireSharedModule } from '../../shared/questionnaire-shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        QuestionnaireSharedModule,
    ],
    declarations: [
        QuestionnaireFormListComponent,
    ],
    exports: [
        QuestionnaireFormListComponent,
    ],
})
export class QuestionnaireFormListModule { }
