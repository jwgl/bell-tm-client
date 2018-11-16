import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MisconductApprovalService } from '../misconduct-approval.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class MisconductApprovalListComponent {
    status: number;
    forms: any[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: MisconductApprovalService,
    ) {
        this.route.params.subscribe(params => {
            this.status = +params['status'];
            this.service.loadList({status: `${this.status}`}).subscribe(forms => {
                this.forms = forms;
            });
        });
    }
}
