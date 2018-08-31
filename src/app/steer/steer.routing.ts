import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
        path: 'obervers/:userId/observations',
        loadChildren: './observation/form/form.module#ObservationFormModule',
    }, {
        path: 'approvers/:userId/observations',
        loadChildren: './observation/approval/approval.module#ApprovalModule',
    }, {
        path: 'legacies',
        loadChildren: './observation/legacy/legacy.module#LegacyModule',
    }, {
        path: 'teachers/:userId/observations',
        loadChildren: './observation/public/public.module#PublicModule',
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class SteerRoutingModule { }
