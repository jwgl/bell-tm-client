import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as Masonry from 'masonry-layout';
import * as dayjs from 'dayjs';

import { ItemStatusConverter } from '../../../shared/common.model';
import { BookingAdminService } from '../booking-admin.service';

@Component({
    styleUrls: ['unsettled-list.component.scss'],
    templateUrl: 'unsettled-list.component.html',
})
export class UnsettledFacilityListComponent implements OnInit {
    itemStatusConverter = new ItemStatusConverter();
    
    forms: any[];
    
    constructor(
        private route: ActivatedRoute,
        private service: BookingAdminService,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(() => {
            this.loadList();
        });
    }

    loadList() {
        this.service.listUnsettledFacilities().subscribe(data => {
            this.forms = data;
            setTimeout(() => {
                new Masonry('.grid', {
                    "percentPosition": true
                });
            });
        });
    }

    duration(d: string): string {
        return dayjs(d).fromNow();
    }
}
