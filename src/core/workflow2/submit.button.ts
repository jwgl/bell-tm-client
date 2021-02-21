import { Directive, EventEmitter, Input, Output, HostListener, HostBinding } from '@angular/core';

import { CommonDialog } from '../common-dialogs';
import { SubmitOptions, Workflow } from './workflow.service';

@Directive({
    selector: 'button[workflow-submit]',
})
export class WorkflowSubmitButtonDirective {
    @Input('workflow-submit') options: SubmitOptions;
    @Output() submitted = new EventEmitter<void>();
    pending = false;

    constructor(
        private dialog: CommonDialog,
        private workflow: Workflow,
    ) { }

    @HostListener('click')
    onClick() {
        if (this.options.validate) {
            const errors = this.options.validate();
            if (errors && errors.length > 0) {
                this.dialog.error(errors);
                return;
            }
        }

        this.dialog.confirm('提交', '确定要提交吗？').then(() => {
            this.pending = true;
            this.workflow.submit(this.options.id).subscribe(() => {
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
        return 'btn btn-primary';
    }
}
