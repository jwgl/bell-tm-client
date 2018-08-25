import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingReportRoutingModule } from './booking-report.routing';
import { BookingReportListModule } from './list/report-list.module';
import { BookingReportItemModule } from './item/report-item.module';
import { BookingReportEditorModule } from './editor/report-editor.module';
import { BookingReportService } from './booking-report.service';

@NgModule({
    imports: [
        CommonModule,
        BookingReportRoutingModule,
        BookingReportListModule,
        BookingReportItemModule,
        BookingReportEditorModule,
    ],
    providers: [
        BookingReportService,
        { provide: 'BOOKING_REPORT_API_URL', useValue: '/api/place/bookingReports' },
        { provide: 'BOOKING_API_URL', useValue: '/api/place/bookings' },
    ],
})
export class BookingReportModule { }
