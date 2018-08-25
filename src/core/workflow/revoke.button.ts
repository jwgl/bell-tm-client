import { Directive, EventEmitter, Input, Output, HostListener, HostBinding } from '@angular/core';

import { Dialog } from '../dialogs';
import { RevokeOptions, Workflow } from './workflow.service';
import { WorkflowRevokeDialog } from './revoke.dialog';

@Directive({
    selector: 'button[workflow-revoke]',
})
export class WorkflowRevokeButtonDirective {
    @Input('workflow-revoke') options: RevokeOptions;
    @Output() revoked = new EventEmitter<any>();
    pending = false;

    constructor(
        private dialog: Dialog,
        private workflow: Workflow,
    ) { }

    @HostListener('click')
    onClick() {
        this.dialog.open(WorkflowRevokeDialog, {
            what: this.options.what,
        }).then(result => {
            this.pending = true;
            return this.workflow.revoke(this.options.id, {
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
        return 'btn btn-primary';
    }
}
