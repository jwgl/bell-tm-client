import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'pollsters/:userId/questionnaires',
    loadChildren: './questionnaire/pollster/questionnaire-form.module#QuestionnaireFormModule',
}, {
    path: 'checkers/:userId/questionnaires',
    loadChildren: './questionnaire/check/questionnaire-check.module#QuestionnaireCheckModule',
// }, {
//     path: 'adminClasses/:adminClassId/questionnaires',
//     loadChildren: './questionnaire/adminClass/admin-class-questionnaire.module#AdminClassQuestionnaireModule',
// }, {
//     path: 'departments/:departmentId/questionnaires',
//     loadChildren: './questionnaire/department/department-questionnaire.module#DepartmentQuestionnaireModule',
// }, {
//     path: 'approvers/:userId/questionnaires',
//     loadChildren: './questionnaire/approval/questionnaire-approval.module#QuestionnaireApprovalModule',
// }, {
//     path: 'respondents/:userId/questionnaires',
//     loadChildren: './questionnaire/respondent/questionnaire-approval.module#RespondentQuestionnaireModule',
// }, {
//     path: 'questionnaires',
//     loadChildren: './questionnaire/public/questionnaires.module#QuestionnaireModule',
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
