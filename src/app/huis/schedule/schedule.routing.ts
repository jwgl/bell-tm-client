import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomScheduleComponent } from './schedule.component';

const routes: Routes = [{
    path: '',
    component: RoomScheduleComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class RoomScheduleRoutingModule { }
