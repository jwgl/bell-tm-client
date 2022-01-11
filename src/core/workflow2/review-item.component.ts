import { Component, EventEmitter, Output, OnInit, Type, ComponentFactoryResolver, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'core/dialogs';

import { WorkflowService } from './workflow-review.service';
import { WorkflowCompleteDialog } from './complete.dialog';

import { WorkflowReviewItemFormViewDirective, WorkflowReviewItemTaskEditorDirective } from './review-item.directive';
import { ReviewInfo, ReviewItem } from './review-item.model';
import { completeActionText } from './complete-action';

@Component({
    selector: 'tm-workflow-item',
    templateUrl: 'review-item.component.html',
})
export class WorkflowReviewItemComponent implements OnInit {
    @Output() onComplete = new EventEmitter<string>();

    @ViewChild(WorkflowReviewItemTaskEditorDirective, { static: true })
    workflowTemplate: WorkflowReviewItemTaskEditorDirective;

    @ViewChild(WorkflowReviewItemFormViewDirective, { static: true })
    viewerHost: WorkflowReviewItemFormViewDirective;

    reviewInfo: ReviewInfo;
    pending = false;

    constructor(
        private route: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver,
        @Inject('WORKFLOW_ITEM_VIEWER')
        private viewerType: Type<any>,
        @Inject('WORKFLOW_ITEM_CONSTRUCTOR')
        private itemConstructor: new (any) => any,
        private dialog: Dialog,
        private workflow: WorkflowService,
    ) { }

    ngOnInit(): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.viewerType);
        this.viewerHost.viewContainerRef.clear();
        const conmponentRef = this.viewerHost.viewContainerRef.createComponent(componentFactory);
        this.route.data.subscribe((data: { item: ReviewItem }) => {
            conmponentRef.instance.form = new this.itemConstructor(data.item.form);
            this.reviewInfo = data.item.reviewInfo;
        });
    }

    onClick(action: string) {
        this.dialog.open(WorkflowCompleteDialog, {
            action: completeActionText(action)
        }).then(result => {
            this.pending = true;
            this.workflow.complete(this.reviewInfo.taskId, {
                result: {
                    key: this.reviewInfo.taskVariable.name,
                    value: action,
                },
                comment: result.comment,
            }).subscribe(() => {
                this.pending = false;
                if (this.reviewInfo.taskVariable.name === 'approvalResult') {
                    this.workflow.message({
                        formId: this.reviewInfo.formId,
                        source: this.workflow.taskUrl,
                        status: this.reviewInfo.taskVariable.name,
                        action
                    }).subscribe();
                }
                this.onComplete.emit(this.reviewInfo.taskId);
            }, errorRsp => {
                this.pending = false;
                alert(errorRsp.error.message);
            });
        });
    }
}
