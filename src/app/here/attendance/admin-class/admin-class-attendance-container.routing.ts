import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminClassAttendanceComponent } from './admin-class-attendance.component';
import { AdminClassAttendanceContainerComponent } from './admin-class-attendance-container.component';
import { AdminClassAttendanceContainerResolve } from './admin-class-attendance-container.resolve';

const routes: Routes = [{
    path: '',
    component: AdminClassAttendanceContainerComponent,
    resolve: {
        data: AdminClassAttendanceContainerResolve,
    },
    runGuardsAndResolvers: 'paramsChange',
    children: [{
        path: '',
        redirectTo: 'all',
        pathMatch: 'full',
    }, {
        path: ':id',
        component: AdminClassAttendanceComponent,
    }],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        AdminClassAttendanceContainerResolve,
    ]
})
export class AdminClassAttendanceContainerRoutingModule { }
