import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Masonry from 'masonry-layout';

import { OperationFormService } from '../operation-form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class OperationFormListComponent {
    forms: any[];
    type: string;
    totalCount: number;
    max = 10;
    offset: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: OperationFormService,
    ) {
        this.route.params.subscribe(params => {
            this.type = params['type']
            if (!this.type) {
                this.router.navigate(['./', { type: 'todo' }], { relativeTo: this.route });
            } else {
                this.loadList(0)
            }
        });
    }

    loadList(offset: number) {
        this.offset = offset;
        this.service.loadListByPage(offset, this.max, { type: this.type }).subscribe(data => {
            this.totalCount = data.totalCount;
            this.forms = data.items;
            setTimeout(() => {
                new Masonry('.grid', {
                    "percentPosition": true
                });
            });
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
