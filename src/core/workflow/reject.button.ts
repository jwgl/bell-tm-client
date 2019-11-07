import { Directive, EventEmitter, Input, Output, HostListener, HostBinding } from '@angular/core';

import { Dialog } from '../dialogs';
import { ReviewOptions, Workflow } from './workflow.service';
import { WorkflowRejectDialog } from './reject.dialog';

@Directive({
    selector: 'button[workflow-reject]',
})
export class WorkflowRejectButtonDirective {
    @Input('workflow-reject') options: ReviewOptions;
    @Input() wordsCount = 0;
    @Output() rejected = new EventEmitter<any>();
    pending = false;

    constructor(
        private dialog: Dialog,
        private workflow: Workflow,
    ) { }

    @HostListener('click')
    onClick() {
        this.dialog.open(WorkflowRejectDialog, {
            does: this.workflow.getDoesLabel(this.options.type),
            what: this.options.what,
            wordsCount: this.wordsCount,
        }).then(result => {
            this.pending = true;
            this.workflow.reject(this.options.id, this.options.wi, {
                title: result.what,
                comment: result.comment,
            }).subscribe(data => {
                this.pending = false;
                this.rejected.emit(data);
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
