import { Component, OnInit } from '@angular/core';

import { BookingFormService } from '../booking-form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class BookingFormListComponent implements OnInit {
    forms: any[];
    totalCount: number;
    max = 10;

    constructor(private service: BookingFormService) { }

    ngOnInit(): void {
        this.loadList(0);
    }

    loadList(offset: number) {
        this.service.loadListByPage(offset, this.max).subscribe(data => {
            this.totalCount = data.totalCount;
            this.forms = data.items;
        });
    }

    get phoneNumber(): string {
        return this.service.phoneNumber;
    }
}
