import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonDialog } from 'core/common-dialogs';

import { BookingForm, BookingItem } from '../../../booking/shared/booking-form.model';
import { BookingAdminService } from '../booking-admin.service';
import './form-item.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class BookingAdminItemComponent implements OnInit {
    itemId: any;
    form: BookingForm;
    formActions: any;

    constructor(
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: BookingAdminService,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.itemId = params['id'];
            this.loadItem();
        });
    }

    loadItem() {
        this.service.loadItem<any>(this.itemId).subscribe(dto => {
            this.form = new BookingForm(dto.form);
            this.formActions = dto.formActions;
        });
    }

    revoke() {
        this.dialog.confirm('回收', '确定要回收吗？').then(() => {
            this.service.revoke(this.form.id).subscribe(() => {
                this.loadItem();
            });
        });
    }

    revokeItem(item: BookingItem) {
        let revoke = item.status != 'REVOKED'
        let prompt = revoke ? '回收' : '恢复';
        this.dialog.confirm(`${prompt}借用项`, `确定要${prompt}吗？`).then(() => {
            this.service.revokeItem(this.form.id, item.id, revoke).subscribe(() => {
                this.loadItem();
            });
        });
    }

    get itemRevokable(): boolean {
        return this.formActions.REVOKE;
    }
}
