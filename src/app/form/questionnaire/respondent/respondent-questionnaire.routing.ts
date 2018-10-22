import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionnaireListComponent } from './list/questionnaire-list.component';
import { QuestionnaireItemComponent } from './item/questionnaire-item.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'open',
    pathMatch: 'full',
}, {
    path: 'open',
    component: QuestionnaireListComponent,
    data: { category: 'open' },
}, {
    path: 'submitted',
    component: QuestionnaireListComponent,
    data: { category: 'submitted' },
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
