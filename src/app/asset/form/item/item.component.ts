import { Component } from '@angular/core';

import { Editable } from 'core/form';
import { WorkflowForm } from 'core/workflow/form-item.model';

import { ReceiptForm } from '../shared/form.model';

@Component({
    templateUrl: 'item.component.html',
})
export class ReceiptItemComponent {
    vm: ReceiptForm;
    convert(dto: any): WorkflowForm {
        return new(Editable(ReceiptForm))(dto.form);
    }
}
