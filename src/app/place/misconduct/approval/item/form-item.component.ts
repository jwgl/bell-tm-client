import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';

import { MisconductApprovalService } from '../misconduct-approval.service';

@Component({
    styleUrls: ['form-item.component.scss'],
    templateUrl: 'form-item.component.html',
})
export class MisconductApprovalItemComponent {
    booking: any;
    misconduct: any;
    status: number;
    saving = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: MisconductApprovalService,
    ) {
        this.route.params.subscribe(params => {
            this.service.loadItem(params['id']).subscribe(dto => this.onLoadData(dto));
        });
    }

    onLoadData(dto: any) {
        this.booking = dto.booking;
        this.misconduct = dto.misconduct;
    }

    get pictureUrl(): string {
        return this.service.getPictureUrl();
    }
}
