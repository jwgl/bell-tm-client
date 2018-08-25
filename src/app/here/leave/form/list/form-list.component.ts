import { Component } from '@angular/core';

import { LeaveFormService } from '../leave-form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class LeaveFormListComponent {
    forms: any[];
    totalCount: number;
    max = 10;

    constructor(private service: LeaveFormService) {
        this.loadList(0);
    }

    loadList(offset: number) {
        this.service.loadListByPage(offset, this.max).subscribe(data => {
            this.totalCount = data.totalCount;
            this.forms = data.items;
        });
    }
}
