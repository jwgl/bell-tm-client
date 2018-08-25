import { Component } from '@angular/core';

import { BookingReportService } from '../booking-report.service';

@Component({
    styleUrls: ['report-list.component.scss'],
    templateUrl: 'report-list.component.html',
})
export class BookingReportListComponent {
    items: any[];
    totalCount: number;
    max = 10;

    constructor(private service: BookingReportService) {
        this.loadList(0);
    }

    loadList(offset: number) {
        this.service.loadListByPage(offset, this.max).subscribe(data => {
            this.totalCount = data.totalCount;
            this.items = data.items;
        });
    }
}
