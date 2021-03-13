import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingFormRoutingModule } from './booking-admin.routing';
import { BookingAdminService } from './booking-admin.service';
import { BookingAdminListModule } from './list/form-list.module';
import { BookingAdminItemModule } from './item/form-item.module';


@NgModule({
    imports: [
        CommonModule,
        BookingFormRoutingModule,
        BookingAdminListModule,
        BookingAdminItemModule,
    ],
    providers: [
        BookingAdminService,
        { provide: 'BOOKING_ADMIN_API_URL', useValue: '/api/huis/departments/${departmentId}/bookingForms' },
    ],
})
export class BookingAdminModule { }
