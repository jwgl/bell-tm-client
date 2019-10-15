import { Directive, EventEmitter, Input, Output, HostListener, HostBinding } from '@angular/core';

import { Dialog } from '../dialogs';
import { SuggestOptions, Workflow } from './workflow.service';
import { WorkflowSuggestDialog } from './suggest.dialog';


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'button[workflow-suggest]',
})
export class WorkflowSuggestButtonDirective {
    // tslint:disable-next-line:no-input-rename
    @Input('workflow-suggest') options: SuggestOptions;
    @Output() suggested = new EventEmitter<any>();
    pending = false;

    constructor(
        private dialog: Dialog,
        private workflow: Workflow,
    ) { }

    @HostListener('click')
    onClick() {
        this.dialog.open(WorkflowSuggestDialog, {
            whoUrl: this.workflow.getAccecptReviewersUrl(this.options.id, this.options.type),
            does: this.workflow.getDoesLabel(this.options.type),
            what: this.options.what,
            suggests: this.options.suggests,
        }).then(result => {
            this.pending = true;
            this.workflow.suggest(this.options.id, this.options.wi, {
                title: result.what,
                to: result.to,
                comment: result.comment,
                suggest: result.suggest,
            }).subscribe(data => {
                this.pending = false;
                this.suggested.emit(data);
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
