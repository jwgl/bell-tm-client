import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'pollsters/:userId/questionnaires',
    loadChildren: './questionnaire/pollster/questionnaire-form.module#QuestionnaireFormModule',
}, {
    path: 'checkers/:userId/questionnaires',
    loadChildren: './questionnaire/check/questionnaire-check.module#QuestionnaireCheckModule',
}, {
    path: 'approvers/:userId/questionnaires',
    loadChildren: './questionnaire/approval/questionnaire-approval.module#QuestionnaireApprovalModule',
}, {
    path: 'supervisors/:userId/questionnaires',
    loadChildren: './questionnaire/adminClassCheck/questionnaire-admin-class-check.module#QuestionnaireAdminClassCheckModule',
}, {
    path: 'respondents/:userId/questionnaires',
    loadChildren: './questionnaire/respondent/respondent-questionnaire.module#RespondentQuestionnaireModule',
}, {
    path: 'q/:hashId',
    loadChildren: './questionnaire/response/response-form.module#ResponseFormModule',
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
