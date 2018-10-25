import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { QuestionnaireEditorComponent } from './editor/form-editor.component';
import { QuestionnaireFormItemComponent } from './item/form-item.component';
import { QuestionnaireFormListComponent } from './list/form-list.component';
import { QuestionnaireResponseComponent } from './response/questionnaire-response.component';

const routes: Routes = [{
    path: '',
    component: QuestionnaireFormListComponent,
}, {
    path: 'create',
    component: QuestionnaireEditorComponent,
    data: { mode: EditMode.Create },
}, {
    path: ':id/edit',
    component: QuestionnaireEditorComponent,
    data: { mode: EditMode.Edit },
}, {
    path: ':id',
    component: QuestionnaireFormItemComponent,
}, {
    path: ':id/responses',
    component: QuestionnaireResponseComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class QuestionnaireFormRoutingModule { }
