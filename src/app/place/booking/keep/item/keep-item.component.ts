import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookingKeepService } from '../booking-keep.service';
import { Misconduct } from './keep-item.model';
import { CommonDialog } from 'core/common-dialogs';

@Component({
    styleUrls: ['keep-item.component.scss'],
    templateUrl: 'keep-item.component.html',
})
export class BookingKeepItemComponent {
    booking: any;
    misconducts: Misconduct[];
    selectedMisconduct: Misconduct;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: BookingKeepService,
    ) {
        this.route.params.subscribe(params => {
            this.service.loadFormForEdit(params['bookingItemId']).subscribe(dto => this.onLoadData(dto));
        });
    }

    onLoadData(dto: any) {
        this.booking = dto.booking
        this.misconducts = dto.forms.map(misconduct => new Misconduct(misconduct));
    }

    onCreateMisconduct() {
        this.selectedMisconduct = new Misconduct(null);
        this.scrollToView()
    }

    onMisconductCreated(misconduct: Misconduct) {
        this.service.createMisconduct(this.booking.bookingItemId, misconduct).subscribe(result => {
            this.misconducts.push(new Misconduct(result));
            this.selectedMisconduct = null;
        });
    }

    onEditMisconduct(misconduct: Misconduct) {
        this.selectedMisconduct = misconduct.clone();
        this.scrollToView()
    }

    onMisconductUpdated(oldItem: Misconduct, newItem: Misconduct) {
        this.service.updateMisconduct(this.booking.bookingItemId, newItem).subscribe(result => {
            const index = this.misconducts.indexOf(oldItem);
            this.misconducts = [...this.misconducts.slice(0, index), new Misconduct(result), ...this.misconducts.slice(index + 1)];
            this.selectedMisconduct = null;
        });
    }

    onMisconductCanceled() {
        this.selectedMisconduct = null;
    }

    onRemoveMisconduct(misconduct: Misconduct) {
        this.dialog.confirm("删除", "确定要删除吗？").then(() => {
            this.service.deleteMisconduct(this.booking.bookingItemId, misconduct).subscribe(() => {
                const index = this.misconducts.indexOf(misconduct);
                this.misconducts = [...this.misconducts.slice(0, index), ...this.misconducts.slice(index + 1)];
            });
        });
    }

    get pictureUrl(): string {
        return this.service.getPictureUrl();
    }

    private scrollToView(): void {
        setTimeout(() => {
            document.getElementById('misconduct-editor').scrollIntoView();
        }, 1);
    }
}
