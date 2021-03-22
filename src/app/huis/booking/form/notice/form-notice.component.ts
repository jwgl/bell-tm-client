import { Component, OnInit } from '@angular/core';

import { BookingFormService } from '../booking-form.service';

@Component({
    templateUrl: 'form-notice.component.html',
})
export class BookingFormNoticeComponent implements OnInit {
    notice: string;
    unsettled: {
        unsettledCount: number,
        statementManager: string,
    };

    constructor(private service: BookingFormService) { }

    ngOnInit(): void {
        this.service.getNotice().subscribe(result => {
            this.notice = result.notice;
            this.unsettled = result.unsettled;
        });
    }
}
