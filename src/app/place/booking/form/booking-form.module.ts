import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { BookingFormRoutingModule } from './booking-form.routing';
import { BookingFormService } from './booking-form.service';
import { BookingFormListModule } from './list/form-list.module';
import { BookingFormItemModule } from './item/form-item.module';
import { BookingFormEditorModule } from './editor/form-editor.module';
import { BookingFormNoticeModule } from './notice/form-notice.module';

@NgModule({
    imports: [
        CommonModule,
        WorkflowModule.forSubmit(BookingFormService),
        BookingFormRoutingModule,
        BookingFormListModule,
        BookingFormItemModule,
        BookingFormEditorModule,
        BookingFormNoticeModule,
    ],
    providers: [
        BookingFormService,
        { provide: 'BOOKING_FORM_API_URL', useValue: '/api/place/users/${userId}/bookings' },
        { provide: 'DEPARTMENT_BOOKING_TYPES_API_URL', useValue: '/api/place/departments/${departmentId}/bookingTypes' },
    ],
})
export class BookingFormModule { }
