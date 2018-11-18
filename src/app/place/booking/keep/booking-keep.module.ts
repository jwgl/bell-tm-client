import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingKeepRoutingModule } from './booking-keep.routing';
import { BookingKeepListModule } from './list/keep-list.module';
import { BookingKeepService } from './booking-keep.service';
import { BookingKeepItemModule } from './item/keep-item.module';

@NgModule({
    imports: [
        CommonModule,
        BookingKeepRoutingModule,
        BookingKeepListModule,
        BookingKeepItemModule
    ],
    providers: [
        BookingKeepService,
        { provide: 'BOOKING_KEEP_API_URL', useValue: '/api/place/keepers/${userId}/bookings' },
        { provide: 'MISCONDUCT_PICTURE_API_URL', useValue: '/api/place/misconductPictures' },
    ],
})
export class BookingKeepModule { }
