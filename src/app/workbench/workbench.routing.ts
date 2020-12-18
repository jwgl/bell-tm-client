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
        loadChildren: () => import('../core/core.module').then(m => m.CoreModule),
    }, {
        path: 'card',
        loadChildren: () => import('../card/card.module').then(m => m.CardModule),
    }, {
        path: 'here',
        loadChildren: () => import('../here/here.module').then(m => m.HereModule),
    }, {
        path: 'plan',
        loadChildren: () => import('../plan/plan.module').then(m => m.PlanModule),
    }, {
        path: 'place',
        loadChildren: () => import('../place/place.module').then(m => m.PlaceModule),
    }, {
        path: 'steer',
        loadChildren: () => import('../steer/steer.module').then(m => m.SteerModule),
    }, {
        path: 'dual',
        loadChildren: () => import('../dual/dual.module').then(m => m.DualModule),
    }, {
        path: 'hunt',
        loadChildren: () => import('../hunt/hunt.module').then(m => m.HuntModule),
    }, {
        path: 'form',
        loadChildren: () => import('../form/form.module').then(m => m.FormModule),
    }, {
        path: 'asset',
        loadChildren: () => import('../asset/asset.module').then(m => m.AssetModule),
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
