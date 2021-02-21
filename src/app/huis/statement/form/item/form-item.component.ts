import { Component } from '@angular/core';

import { WorkflowForm } from 'core/workflow2/form-item.model';
import { Actionable } from 'core/workflow2/form-item.model';

import { StatementForm } from '../../shared/statement-form.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class StatementFormItemComponent {
    convert(dto: any): WorkflowForm {
        return new (Actionable(StatementForm))(dto);
    }
}
