import { Component } from '@angular/core';

import { Editable } from 'core/form';
import { WorkflowForm } from 'core/workflow/form-item.model';
import { TransferForm } from '../../area/shared/form.model';

@Component({
    templateUrl: 'transfer-form-item.component.html',
})
export class TransferFormItemComponent {
    vm: TransferForm;

    convert(dto: any): WorkflowForm {
        return new (Editable(TransferForm))(dto.form);
    }
}
