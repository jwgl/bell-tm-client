import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionnaireListComponent } from './list/questionnaire-list.component';
import { QuestionnaireItemComponent } from './item/questionnaire-item.component';

const routes: Routes = [{
    path: '',
    component: QuestionnaireListComponent,
}, {
    path: ':id',
    component: QuestionnaireItemComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ResponseFormRoutingModule { }
