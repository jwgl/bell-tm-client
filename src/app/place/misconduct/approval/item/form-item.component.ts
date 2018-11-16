import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';

import { MisconductApprovalService } from '../misconduct-approval.service';
import { MisconductStatus } from '../../sharied/misconduct.model';

@Component({
    styleUrls: ['form-item.component.scss'],
    templateUrl: 'form-item.component.html',
})
export class MisconductApprovalItemComponent {
    booking: any;
    misconduct: any;
    status: number;
    saving = false;
    approverOutcome: string;

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
        this.approverOutcome = this.misconduct.approverOutcome;
    }

    forgive() {
        this.service.updateStatus(
            this.misconduct.id,
            MisconductStatus.Forgive,
            this.approverOutcome,
        ).subscribe(() => {
            this.misconduct.status = MisconductStatus.Forgive;
            this.misconduct.approverOutcome = this.approverOutcome;
        }, (error) => {
            alert(error.message);
        });
    }

    confirm() {
        this.service.updateStatus(
            this.misconduct.id,
            MisconductStatus.Confirming,
            this.approverOutcome,
        ).subscribe(() => {
            this.misconduct.status = MisconductStatus.Forgive;
            this.misconduct.approverOutcome = this.approverOutcome;
        }, (error) => {
            alert(error.message);
        });
    }

    get pictureUrl(): string {
        return this.service.getPictureUrl();
    }
}
