import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Workflow2Module } from 'core/workflow2';

import { BookingFormRoutingModule } from './booking-form.routing';
import { BookingFormService } from './booking-form.service';
import { BookingFormListModule } from './list/form-list.module';
import { BookingFormItemModule } from './item/form-item.module';
import { BookingFormEditorModule } from './editor/form-editor.module';
import { BookingFormNoticeModule } from './notice/form-notice.module';

@NgModule({
    imports: [
        CommonModule,
        Workflow2Module.forSubmit(BookingFormService),
        BookingFormRoutingModule,
        BookingFormListModule,
        BookingFormItemModule,
        BookingFormEditorModule,
        BookingFormNoticeModule,
    ],
    providers: [
        BookingFormService,
        { provide: 'BOOKING_FORM_API_URL', useValue: '/api/huis/users/${userId}/bookingForms' },
        { provide: 'BOOKING_ROOM_API_URL', useValue: '/api/huis/users/${userId}/bookingRooms' },
    ],
})
export class BookingFormModule { }
