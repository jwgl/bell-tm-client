import { Component } from '@angular/core';

import { Editable } from 'core/form';
import { WorkflowForm } from 'core/workflow/form-item.model';

import { Questionnaire } from '../../shared/questionnaire-form.model';
import { QuestionnaireFormService } from '../questionnaire-form.service';
import { CommonDialog } from 'core/common-dialogs';
import { ClipboardService } from 'ngx-clipboard';

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
        this.dialog.confirm('发布', `确定要${form.hashId ? '取消' : '开始'}发布吗？`).then(() => {
            this.service.togglePublished(form.id, !form.hashId).subscribe(hashId => {
                form.hashId = hashId;
            });
        });
    }

    copyUrl(form: Questionnaire): void {
         this.clipboardService.copyFromContent(`${window.location.protocol}//${window.location.host}/form/q/${form.hashId}`);
    }
}
