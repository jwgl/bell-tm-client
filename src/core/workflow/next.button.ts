import { Directive, EventEmitter, Input, Output, HostListener, HostBinding } from '@angular/core';

import { Dialog } from '../dialogs';
import { NextOptions, Workflow } from './workflow.service';
import { WorkflowNextDialog } from './next.dialog';

@Directive({
    selector: 'button[workflow-next]',
})
export class WorkflowNextButtonDirective {
    @Input('workflow-next') options: NextOptions;
    @Output() nexted = new EventEmitter<any>();
    pending = false;

    constructor(
        private dialog: Dialog,
        private workflow: Workflow,
    ) { }

    @HostListener('click')
    onClick() {
        this.dialog.open(WorkflowNextDialog, {
            whoUrl: this.workflow.getNextReviewersUrl(this.options.id, this.options.type),
            does: this.workflow.getDoesLabel(this.options.type),
            what: this.options.what,
        }).then(result => {
            this.pending = true;
            this.workflow.next(this.options.id, this.options.wi, {
                title: result.what,
                to: result.to,
                comment: result.comment,
            }).subscribe(data => {
                this.pending = false;
                this.nexted.emit(data);
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
