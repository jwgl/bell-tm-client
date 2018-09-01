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
    }, {
        path: 'reports',
        loadChildren: './observation/reports/report.module#ReportModule',
    }, {
        path: 'settings/observers',
        loadChildren: './observation/settings/observer-settings.module#ObserverSettingsModule',
    }, {
        path: 'departments/:departmentId/observers',
        loadChildren: './observation/settings/department/department-observer-setting.module#DepartmentObserverSettingModule',
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
