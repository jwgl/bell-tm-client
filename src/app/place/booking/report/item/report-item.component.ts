import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonDialog } from 'core/common-dialogs';

import { BookingReportService } from '../booking-report.service';
import { BookingReport } from '../booking-report.model';

@Component({
    templateUrl: 'report-item.component.html',
})
export class BookingReportItemComponent {
    @ViewChild('viewerTpl')
    viewerTemplate: TemplateRef<any>;

    vm: BookingReport;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: BookingReportService,
        @Inject('BOOKING_REPORT_API_URL')
        public bookingReportApiUrl: string,
    ) {
        this.route.params.subscribe(params => {
            this.loadItem(+params['id']);
        });
    }

    loadItem(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            this.vm = BookingReport.fromDto(dto);
        });
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.vm.id).subscribe(() => {
                this.router.navigate(['../'], { relativeTo: this.route });
            });
        });
    }
}
