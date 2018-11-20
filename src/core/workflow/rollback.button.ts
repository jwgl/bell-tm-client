import { Directive, EventEmitter, Input, Output, HostListener, HostBinding } from '@angular/core';

import { Dialog } from '../dialogs';
import { RevokeOptions, Workflow } from './workflow.service';
import { WorkflowRollbackDialog } from './rollback.dialog';

@Directive({
    selector: 'button[workflow-rollback]',
})
export class WorkflowRollbackButtonDirective {
    @Input('workflow-rollback') options: RevokeOptions;
    @Output() revoked = new EventEmitter<any>();
    pending = false;

    constructor(
        private dialog: Dialog,
        private workflow: Workflow,
    ) { }

    @HostListener('click')
    onClick() {
        this.dialog.open(WorkflowRollbackDialog, {
            what: this.options.what,
        }).then(result => {
            this.pending = true;
            return this.workflow.rollback(this.options.id, {
                title: result.what,
                comment: result.comment,
            }).subscribe(data => {
                this.pending = false;
                this.revoked.emit(data);
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
        return 'btn btn-warning';
    }
}
