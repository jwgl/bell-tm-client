import { Component } from '@angular/core';

import { WorkflowForm } from 'core/workflow2/form-item.model';
import { Actionable } from 'core/workflow2/form-item.model';

import { OperationForm } from '../../shared/operation-form.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class OperationFormItemComponent {
    convert(dto: any): WorkflowForm {
        return new (Actionable(OperationForm))(dto);
    }
}
