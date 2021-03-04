import { Directive, EventEmitter, Input, Output, HostListener, HostBinding } from '@angular/core';

import { CommonDialog } from 'core/common-dialogs';
import { Dialog } from '../dialogs';
import { InitiatorCompleteOptions, Workflow } from './workflow.service';
import { WorkflowInitiatorCompleteDialog } from './initiator-complete.dialog';


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
        private workflow: Workflow,
    ) { }

    @HostListener('click')
    onClick() {
        switch (this.options.result.value) {
            case "SUBMIT":
                this.dialog.open(WorkflowInitiatorCompleteDialog, {
                    wordsCount: this.wordsCount,
                }).then(result => {
                    this.pending = true;
                    this.workflow.completeByInitiator(this.options.id, this.options.workflowTaskId, {
                        result: this.options.result,
                        comment: result.comment,
                    }).subscribe(data => {
                        this.pending = false;
                        this.completed.emit(data);
                    }, errorRsp => {
                        this.pending = false;
                        alert(errorRsp.error.message);
                    });
                });
                break;
            case "TERMINATE":
                this.commonDialog.confirm("终止流程", "确定要终止流程吗？").then(() => {
                    this.pending = true;
                    this.workflow.completeByInitiator(this.options.id, this.options.workflowTaskId, {
                        result: this.options.result
                    }).subscribe(data => {
                        this.pending = false;
                        this.completed.emit(data);
                    }, errorRsp => {
                        this.pending = false;
                        alert(errorRsp.error.message);
                    });
                });
                break;
        }
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
