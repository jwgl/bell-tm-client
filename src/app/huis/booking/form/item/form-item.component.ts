import { Component } from '@angular/core';

import { WorkflowForm } from 'core/workflow2/form-item.model';
import { Actionable } from 'core/workflow2/form-item.model';

import { BookingForm } from '../../shared/booking-form.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class BookingFormItemComponent {
    convert(dto: any): WorkflowForm {
        return new (Actionable(BookingForm))(dto);
    }
}
