import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'settings/types',
    loadChildren: './settings/type/type.module#HuntTypeModule',
}, {
    path: 'settings/tasks',
    loadChildren: './settings/task/task.module#TaskFormModule',
}, {
    path: 'settings/experts',
    loadChildren: './settings/expert/form/expert.module#ExpertFormModule',
}, {
    path: 'settings/checkers',
    loadChildren: './settings/checker/form/checker.module#CheckerFormModule',
}, {
    path: 'teachers/:userId/applications',
    loadChildren: './project/application/form/form.module#ProjectModule',
}, {
    path: 'checkers/:userId/tasks',
    loadChildren: './project/application/check/check.module#CheckModule',
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class HuntRoutingModule { }
