import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomSettingComponent } from './room-setting.component';

const routes: Routes = [{
    path: '',
    component: RoomSettingComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class RoomSettingRoutingModule { }
