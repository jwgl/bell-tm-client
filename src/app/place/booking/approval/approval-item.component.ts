import { Component } from '@angular/core';

import { BookingForm } from '../shared/booking-form.model';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class BookingApprovalItemComponent {
    form: BookingForm;

    onItemLoaded(dto: any) {
        this.form = new BookingForm(dto.form);
    }
}
