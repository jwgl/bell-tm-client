import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RollcallFormResolve } from './rollcall-form.resolve';
import { RollcallScheduleComponent } from './schedule/rollcall-schedule.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'timetable',
    pathMatch: 'full',
}, {
    path: 'timetable',
    component: RollcallScheduleComponent,
    resolve: {
        list: RollcallFormResolve,
    },
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        RollcallFormResolve,
    ],
})
export class RollcallFormRoutingModule { }
