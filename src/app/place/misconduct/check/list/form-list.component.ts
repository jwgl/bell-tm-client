import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MisconductCheckService } from '../misconduct-check.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class MisconductCheckListComponent {
    status: string;
    items: any[];
    loading = false;
    totalCount: number;
    max = 10;

    constructor(
        private route: ActivatedRoute,
        private service: MisconductCheckService,
    ) {
        this.route.params.subscribe(params => {
            this.status = params['status'];
            this.loadList(0);
        });
    }

    loadList(offset: number) {
        this.loading = true;
        this.service.loadListByPage(offset, this.max, { status: `${this.status}` }).subscribe(data => {
            this.totalCount = data.totalCount;
            this.service.counts[this.status] = this.totalCount;
            this.items = data.items;
            this.loading = false;
        });
    }
}
