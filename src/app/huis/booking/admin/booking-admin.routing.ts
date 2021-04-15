import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingAdminItemComponent } from './item/form-item.component';
import { BookingAdminListComponent } from './list/form-list.component';
import { UnsettledFacilityListComponent } from './unsettled-facility/unsettled-list.component';

const routes: Routes = [{
    path: '',
    component: BookingAdminListComponent,
}, {
    path: 'unsettledFacilities',
    component: UnsettledFacilityListComponent,
}, {
    path: ':id',
    component: BookingAdminItemComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class BookingAdminRoutingModule { }
