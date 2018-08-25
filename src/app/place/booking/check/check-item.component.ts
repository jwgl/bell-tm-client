import { Component } from '@angular/core';

import { BookingForm } from '../shared/booking-form.model';

@Component({
    templateUrl: 'check-item.component.html',
})
export class BookingCheckItemComponent {
    form: BookingForm;

    onItemLoaded(dto: any) {
        this.form = new BookingForm(dto.form);
    }
}
