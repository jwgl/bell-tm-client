import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingAuthComponent } from './booking-auth.component';

const routes: Routes = [{
    path: '',
    component: BookingAuthComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class BookingAuthRoutingModule { }
