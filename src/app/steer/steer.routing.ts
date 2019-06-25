import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
        path: 'obervers/:userId/observations',
        loadChildren: () => import('./observation/form/form.module').then(m => m.ObservationFormModule),
    }, {
        path: 'approvers/:userId/observations',
        loadChildren: () => import('./observation/approval/approval.module').then(m => m.ApprovalModule),
    }, {
        path: 'legacies',
        loadChildren: () => import('./observation/legacy/legacy.module').then(m => m.LegacyModule),
    }, {
        path: 'teachers/:userId/observations',
        loadChildren: () => import('./observation/public/public.module').then(m => m.PublicModule),
    }, {
        path: 'reports',
        loadChildren: () => import('./observation/reports/report.module').then(m => m.ReportModule),
    }, {
        path: 'settings/observers',
        loadChildren: () => import('./observation/settings/observer-settings.module').then(m => m.ObserverSettingsModule),
    }, {
        path: 'departments/:departmentId/observers',
        loadChildren: () => import('./observation/settings/department/department-observer-setting.module').then(m => m.DepartmentObserverSettingModule),
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
