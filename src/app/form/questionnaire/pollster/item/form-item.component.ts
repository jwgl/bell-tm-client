import { Component } from '@angular/core';

import { Editable } from 'core/form';
import { WorkflowForm } from 'core/workflow/form-item.model';

import { Questionnaire } from '../../shared/questionnaire-form.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class QuestionnaireFormItemComponent {
    preview = false;

    convert(dto: any): WorkflowForm {
        return new (Editable(Questionnaire))(dto);
    }
}
