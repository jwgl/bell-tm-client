import { Component, ContentChild, TemplateRef, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RevokeOptions } from './workflow.service';

@Component({
    selector: 'tm-workflow-item',
    templateUrl: 'review-item.component.html',
})
export class WorkflowReviewItemComponent implements OnInit {
    @ContentChild('toolbarTpl')
    toolbarTemplate: TemplateRef<any>;

    @ContentChild('viewerTpl')
    viewerTemplate: TemplateRef<any>;

    @Input()
    reviewable: boolean;

    @Input()
    reviewType: 'check' | 'approve';

    @Input()
    reviewTitle: string;

    @Input()
    acceptEnabled = true;

    @Input()
    revokable = false;

    @Input()
    needreview = false;

    @Output()
    itemLoaded = new EventEmitter<any>(true);

    id: any;
    wi: string;
    prevId: number;
    nextId: number;
    workflowInstanceId: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => this.id = params['id']);
        this.route.data.subscribe((data: { item: any }) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
        this.workflowInstanceId = dto.form.workflowInstanceId;
        this.itemLoaded.emit(dto);
    }

    // get reviewOptions(): ReviewOptions {
    //     return {
    //         id: this.id,
    //         wi: this.wi,
    //         type: this.reviewType,
    //         what: this.reviewTitle,
    //     };
    // }

    get revokeOptions(): RevokeOptions {
        return {
            id: this.id,
            what: this.reviewTitle,
        };
    }
}
