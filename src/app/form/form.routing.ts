import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'pollsters/:userId/questionnaires',
    loadChildren: () => import('./questionnaire/pollster/questionnaire-form.module').then(m => m.QuestionnaireFormModule),
}, {
    path: 'checkers/:userId/questionnaires',
    loadChildren: () => import('./questionnaire/check/questionnaire-check.module').then(m => m.QuestionnaireCheckModule),
}, {
    path: 'approvers/:userId/questionnaires',
    loadChildren: () => import('./questionnaire/approval/questionnaire-approval.module').then(m => m.QuestionnaireApprovalModule),
}, {
    path: 'supervisors/:userId/questionnaires',
    loadChildren: () => import('./questionnaire/adminClassCheck/questionnaire-admin-class-check.module').then(m => m.QuestionnaireAdminClassCheckModule),
}, {
    path: 'respondents/:userId/questionnaires',
    loadChildren: () => import('./questionnaire/respondent/respondent-questionnaire.module').then(m => m.RespondentQuestionnaireModule),
}, {
    path: 'q/:hashId',
    loadChildren: () => import('./questionnaire/response/response-form.module').then(m => m.ResponseFormModule),
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class FormRoutingModule { }
