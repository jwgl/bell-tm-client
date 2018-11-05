import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { QuestionnaireListComponent } from './questionnaire-list.component';
import { QuestionnaireSharedModule } from '../../shared/questionnaire-shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        QuestionnaireSharedModule,
    ],
    declarations: [
        QuestionnaireListComponent,
    ],
    exports: [
        QuestionnaireListComponent,
    ],
})
export class QuestionnaireListModule { }
