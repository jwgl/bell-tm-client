import { Component, Input } from '@angular/core';

import { ReviewList } from './review-list.model';

@Component({
    selector: 'tm-workflow-list-pager',
    templateUrl: 'list-pager.component.html',
})
export class WorkflowListPagerComponent {
    @Input() reviewList: ReviewList;
}
