import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ObserverEditorComponent } from './editor/observer-editor.component';
import { ObserverListComponent } from './list/observer-list.component';
import { ObserverReportComponent } from './report/observer-report.component';

const routes: Routes = [
    { path: '', component: ObserverListComponent },
    { path: 'editor', component: ObserverEditorComponent },
    { path: 'list', component: ObserverListComponent },
    { path: 'report', component: ObserverReportComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class DepartmentObserverSettingRoutingModule { }
