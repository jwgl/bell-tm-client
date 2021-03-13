import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as Masonry from 'masonry-layout';

import { BookingAdminService } from '../booking-admin.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class BookingAdminListComponent implements OnInit {
    forms: any[];
    totalCount: number;
    page: number;
    size = 12;
    queryString: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: BookingAdminService,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.page = params["page"] ? parseInt(params["page"]) : 0;
            this.queryString = params["q"];
            this.loadList();
        });
    }

    loadList() {
        this.service.loadPage(this.page, this.size, { query: this.queryString }).subscribe(data => {
            this.totalCount = data.totalCount;
            this.forms = data.items;
            setTimeout(() => {
                new Masonry('.grid', {
                    "percentPosition": true
                });
            });
        });
    }

    get searchLink() {
        return this.queryString
            ? [{ page: 0, q: this.queryString }]
            : [{ page: 0 }];
    }

    get extraLink() {
        return this.queryString
            ? { q: this.queryString }
            : null;
    }
}
