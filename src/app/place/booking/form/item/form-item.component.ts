import { Component } from '@angular/core';

import { Editable } from 'core/form';
import { WorkflowForm } from 'core/workflow/form-item.model';

import { BookingForm } from '../../shared/booking-form.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class BookingFormItemComponent {
    convert(dto: any): WorkflowForm {
        return new (Editable(BookingForm))(dto);
    }
}
