import { Component, OnInit } from '@angular/core';

import { StatementFormService } from '../statement-form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class StatementFormListComponent implements OnInit {
    forms: any[];
    totalCount: number;
    max = 10;

    constructor(private service: StatementFormService) { }

    ngOnInit(): void {
        this.loadList(0);
    }

    loadList(offset: number) {
        this.service.loadListByPage(offset, this.max).subscribe(data => {
            this.totalCount = data.totalCount;
            this.forms = data.items;
        });
    }

    getItemLink(form: any): String[] {
        return form.workflowTaskId
            ? [form.id, { workflowTaskId: form.workflowTaskId }]
            : [form.id];
    }

    get phoneNumber(): string {
        return this.service.userInfo.phoneNumber;
    }

    get userId(): string {
        return this.service.userInfo.id;
    }
}
