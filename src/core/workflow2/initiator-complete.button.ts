import { Directive, EventEmitter, Input, Output, HostListener, HostBinding } from '@angular/core';

import { CommonDialog } from 'core/common-dialogs';
import { Dialog } from '../dialogs';
import { completeActionClass, completeActionText } from './complete-action';
import { WorkflowInitiatorCompleteDialog } from './initiator-complete.dialog';
import { InitiatorCompleteOptions, WorkflowSubmitService } from './workflow-submit.service';


@Directive({
    selector: 'button[workflow-initiator-complete]',
})
export class WorkflowInitiatorCompleteButtonDirective {
    @Input('workflow-initiator-complete') options: InitiatorCompleteOptions;
    @Input() wordsCount = 0;
    @Output() completed = new EventEmitter<any>();
    pending = false;

    constructor(
        private commonDialog: CommonDialog,
        private dialog: Dialog,
        private workflow: WorkflowSubmitService,
    ) { }

    @HostListener('click')
    onClick() {
        switch (this.options.result.value) {
            case "SUBMIT":
                this.dialog.open(WorkflowInitiatorCompleteDialog, {
                    action: completeActionText(this.options.result.value),
                }).then(result => {
                    this.complete(result.comment);
                });
                break;
            case "TERMINATE":
                this.commonDialog.confirm("终止流程", "确定要终止流程吗？").then(() => {
                    this.complete(null);
                });
                break;
        }
    }

    complete(comment: string) {
        this.pending = true;
        this.workflow.completeByInitiator(this.options.id, this.options.workflowTaskId, {
            result: this.options.result,
            comment: comment,
        }).subscribe(data => {
            this.pending = false;
            this.completed.emit(data);
        }, errorRsp => {
            this.pending = false;
            alert(errorRsp.error.message);
        });
    }

    @HostBinding('disabled')
    get disabled() {
        return this.pending;
    }

    @HostBinding('class')
    get buttonClass() {
        return `btn btn-${completeActionClass(this.options.result.value)}`;
    }
}
