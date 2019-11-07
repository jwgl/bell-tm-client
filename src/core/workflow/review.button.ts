import { Directive, EventEmitter, Input, Output, HostListener, HostBinding } from '@angular/core';

import { Dialog } from '../dialogs';
import { ReviewOptions, Workflow } from './workflow.service';
import { WorkflowReviewDialog } from './review.dialog';


@Directive({
    selector: 'button[workflow-review]',
})
export class WorkflowReviewButtonDirective {
    @Input('workflow-review') options: ReviewOptions;
    @Input() wordsCount = 0;
    @Output() review = new EventEmitter<any>();
    pending = false;

    constructor(
        private dialog: Dialog,
        private workflow: Workflow,
    ) { }

    @HostListener('click')
    onClick() {
        this.dialog.open(WorkflowReviewDialog, {
            whoUrl: this.workflow.getReviewersUrl(this.options.id),
            does: this.workflow.getDoesLabel(this.options.type),
            what: this.options.what,
            reviews: this.options.reviews,
            wordsCount: this.wordsCount,
        }).then(result => {
            this.pending = true;
            this.workflow.review(this.options.id, this.options.wi, {
                title: result.what,
                to: result.to,
                comment: result.comment,
                review: result.review,
            }).subscribe(data => {
                this.pending = false;
                this.review.emit(data);
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
