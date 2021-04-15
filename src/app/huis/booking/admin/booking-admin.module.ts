import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingAdminRoutingModule } from './booking-admin.routing';
import { BookingAdminService } from './booking-admin.service';
import { BookingAdminListModule } from './list/form-list.module';
import { BookingAdminItemModule } from './item/form-item.module';
import { UnsettledFacilityListModule } from './unsettled-facility/unsettled-list.module';

@NgModule({
    imports: [
        CommonModule,
        BookingAdminRoutingModule,
        BookingAdminListModule,
        BookingAdminItemModule,
        UnsettledFacilityListModule,
    ],
    providers: [
        BookingAdminService,
        { provide: 'BOOKING_ADMIN_API_URL', useValue: '/api/huis/departments/${departmentId}/bookingForms' },
    ],
})
export class BookingAdminModule { }
