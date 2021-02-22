import { Component, OnInit } from '@angular/core';

import { OperationFormService } from '../operation-form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class OperationFormListComponent implements OnInit {
    forms: any[];
    totalCount: number;
    max = 10;

    constructor(private service: OperationFormService) { }

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
        if (form.workflowTaskId) {
            return [
                '../operationTasks',
                { type: 'item', returnUrl: 'operationForms' },
                form.workflowTaskId,
                { formId: form.id },
            ]
        } else {
            return [form.id]
        }
    }

    get phoneNumber(): string {
        return this.service.userInfo.phoneNumber;
    }

    get userId(): string {
        return this.service.userInfo.id;
    }
}
