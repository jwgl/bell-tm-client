import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingKeepListComponent } from './list/keep-list.component';
import { BookingKeepItemComponent } from './item/keep-item.component';

const routes: Routes = [{
    path: '',
    component: BookingKeepListComponent,
}, {
    path: ':bookingItemId',
    component: BookingKeepItemComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class BookingKeepRoutingModule { }
