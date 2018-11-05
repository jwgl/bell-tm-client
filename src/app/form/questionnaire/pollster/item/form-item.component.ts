import { Component } from '@angular/core';

import { CommonDialog } from 'core/common-dialogs';
import { ClipboardService } from 'ngx-clipboard';

import { Editable } from 'core/form';
import { WorkflowForm } from 'core/workflow/form-item.model';

import { QuestionnaireFormService } from '../questionnaire-form.service';
import { Questionnaire } from '../../shared/questionnaire-form.model';
import './form-item.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class QuestionnaireFormItemComponent {
    preview = false;

    constructor(
        private dialog: CommonDialog,
        private service: QuestionnaireFormService,
        private clipboardService: ClipboardService,
    ) { }

    convert(dto: any): WorkflowForm {
        return new (Editable(Questionnaire))(dto);
    }

    togglePublished(form: Questionnaire): void {
        this.dialog.confirm('发布', `确定要${form.published ? '取消' : '开始'}发布吗？`).then(() => {
            this.service.togglePublished(form.id, !form.published).subscribe(() => {
                form.published = !form.published;
            });
        });
    }

    copyUrl(form: Questionnaire): void {
         this.clipboardService.copyFromContent(`${window.location.protocol}//${window.location.host}/form/q/${form.hashId}`);
    }
}
