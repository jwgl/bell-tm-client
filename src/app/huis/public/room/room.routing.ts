import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicRoomComponent } from './room.component';

const routes: Routes = [{
    path: '',
    component: PublicRoomComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class PublicRoomRoutingModule { }
