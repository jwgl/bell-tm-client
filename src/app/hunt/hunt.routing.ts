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
