import { Component } from '@angular/core';

import { Editable } from 'core/form';
import { WorkflowForm } from 'core/workflow/form-item.model';

import { ReissueForm } from '../../shared/reissue-form.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class ReissueFormItemComponent {
    convert(dto: any): WorkflowForm {
        return new (Editable(ReissueForm))(dto.form, dto.student);
    }
}
