import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkbenchComponent } from './workbench.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './p404/p404.component';

const routes: Routes = [{
    path: '',
    component: WorkbenchComponent,
    children: [{
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    }, {
        path: 'core',
        loadChildren: '../core/core.module#CoreModule',
    }, {
        path: 'card',
        loadChildren: '../card/card.module#CardModule',
    }, {
        path: 'here',
        loadChildren: '../here/here.module#HereModule',
    }, {
        path: 'plan',
        loadChildren: '../plan/plan.module#PlanModule',
    }, {
        path: 'place',
        loadChildren: '../place/place.module#PlaceModule',
    }, {
        path: 'steer',
        loadChildren: '../steer/steer.module#SteerModule',
    }, {
        path: '**',
        component: Page404Component,
    }],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class WorkbenchRoutingModule { }
