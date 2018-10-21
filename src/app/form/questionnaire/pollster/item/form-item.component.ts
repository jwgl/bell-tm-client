import { Component } from '@angular/core';

import { Editable } from 'core/form';
import { WorkflowForm } from 'core/workflow/form-item.model';

import { Questionnaire } from '../../shared/questionnaire-form.model';
import { QuestionnaireFormService } from '../questionnaire-form.service';
import { CommonDialog } from 'core/common-dialogs';

@Component({
    templateUrl: 'form-item.component.html',
})
export class QuestionnaireFormItemComponent {
    preview = false;

    constructor(
        private dialog: CommonDialog,
        private service: QuestionnaireFormService
    ) { }

    convert(dto: any): WorkflowForm {
        return new (Editable(Questionnaire))(dto);
    }

    togglePublished(form: Questionnaire) {
        this.dialog.confirm('发布', `确定要${form.published ? '取消' : '开始'}发布吗？`).then(() => {
            this.service.togglePublished(form.id, !form.published).subscribe(() => {
                form.published = !form.published;
            });
        });
    }
}
