import { Component, ContentChild, TemplateRef, Input, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReviewList } from './review-list.model';

@Component({
    selector: 'tm-workflow-list',
    styleUrls: ['review-list.component.scss'],
    templateUrl: 'review-list.component.html',
})
export class WorkflowReviewListComponent {
    @ContentChild('theadTpl')
    theadTemplate: TemplateRef<any>;

    @ContentChild('tbodyTpl')
    tbodyTemplate: TemplateRef<any>;

    @Input()
    expand = true;

    list: ReviewList;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: { list: ReviewList }) => {
            this.list = data.list;
        });
    }
}
