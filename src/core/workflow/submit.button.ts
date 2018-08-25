import { Directive, EventEmitter, Input, Output, HostListener, HostBinding } from '@angular/core';

import { CommonDialog } from '../common-dialogs';
import { Dialog } from '../dialogs';
import { SubmitOptions, Workflow } from './workflow.service';
import { WorkflowSubmitDialog } from './submit.dialog';

@Directive({
    selector: 'button[workflow-submit]',
})
export class WorkflowSubmitButtonDirective {
    @Input('workflow-submit') options: SubmitOptions;
    @Output() submitted = new EventEmitter<void>();
    pending = false;

    constructor(
        private commonDialog: CommonDialog,
        private dialog: Dialog,
        private workflow: Workflow,
    ) { }

    @HostListener('click')
    onClick() {
        if (this.options.validate) {
            const errors = this.options.validate();
            if (errors && errors.length > 0) {
                this.commonDialog.error(errors);
                return;
            }
        }

        this.dialog.open(WorkflowSubmitDialog, {
            whoUrl: this.workflow.getSubmitReviewersUrl(this.options.id, this.options.type),
            does: this.workflow.getDoesLabel(this.options.type),
            what: this.options.what,
        }).then(result => {
            this.pending = true;
            this.workflow.submit(this.options.id, {
                title: result.what,
                to: result.to,
                comment: result.comment,
            }).subscribe(() => {
                this.pending = false;
                this.submitted.emit();
            }, (error) => {
                this.pending = false;
                alert(error.message);
            });
        });
    }

    @HostBinding('disabled')
    get disabled() {
        return this.pending;
    }

    @HostBinding('class')
    get buttonClass() {
        return 'btn btn-secondary';
    }
}
