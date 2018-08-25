import { Directive, EventEmitter, Input, Output, HostListener, HostBinding } from '@angular/core';

import { Dialog } from '../dialogs';
import { ReviewOptions, Workflow } from './workflow.service';
import { WorkflowAcceptDialog } from './accept.dialog';


@Directive({
    selector: 'button[workflow-accept]',
})
export class WorkflowAcceptButtonDirective {
    @Input('workflow-accept') options: ReviewOptions;
    @Output() accepted = new EventEmitter<any>();
    pending = false;

    constructor(
        private dialog: Dialog,
        private workflow: Workflow,
    ) { }

    @HostListener('click')
    onClick() {
        this.dialog.open(WorkflowAcceptDialog, {
            whoUrl: this.workflow.getAccecptReviewersUrl(this.options.id, this.options.type),
            does: this.workflow.getDoesLabel(this.options.type),
            what: this.options.what,
        }).then(result => {
            this.pending = true;
            this.workflow.accept(this.options.id, this.options.wi, {
                title: result.what,
                to: result.to,
                comment: result.comment,
            }).subscribe(data => {
                this.pending = false;
                this.accepted.emit(data);
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
