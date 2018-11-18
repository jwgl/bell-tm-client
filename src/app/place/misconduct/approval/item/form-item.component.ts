import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MisconductApprovalService } from '../misconduct-approval.service';
import { MisconductStatus } from '../../shared/misconduct.model';

@Component({
    styleUrls: ['form-item.component.scss'],
    templateUrl: 'form-item.component.html',
})
export class MisconductApprovalItemComponent {
    booking: any;
    misconduct: any;
    status: number;
    saving = false;
    outcome: string;

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

    onForgive() {
        this.updateStatus(MisconductStatus.Forgive);
    }

    onConfirming() {
        this.updateStatus(MisconductStatus.Confirming);
    }

    onConfirmed() {
        this.updateStatus(MisconductStatus.Proccessed);
    }

    private updateStatus(status: MisconductStatus) {
        this.service.updateStatus(
            this.misconduct.id,
            status,
            this.outcome,
        ).subscribe(() => {
            this.router.navigate(['../'], { relativeTo: this.route });
        }, (error) => {
            alert(error.message);
        });
    }

    get pictureUrl(): string {
        return this.service.getPictureUrl();
    }
}
