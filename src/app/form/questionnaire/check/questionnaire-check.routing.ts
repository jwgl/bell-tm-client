import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { QuestionnaireCheckListComponent } from './check-list.component';
import { QuestionnaireCheckItemComponent } from './check-item.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            QuestionnaireCheckListComponent,
            QuestionnaireCheckItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class QuestionnaireCheckRoutingModule { }
