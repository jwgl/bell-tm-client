import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ListGroup } from './list-group.model';
import { Workflow } from './workflow.service';

@Component({
    templateUrl: 'review-container.component.html',
})
export class WorkflowReviewContainerComponent {
    notice: string;
    queryable = false;
    queryString: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private workflow: Workflow,
    ) {
        this.route.data.subscribe((data: {
            notice?: string,
            queryable?: boolean,
        }) => {
            this.notice = data.notice;
            this.queryable = data.queryable;
        });
    }

    get group(): ListGroup {
        return this.workflow.listGroup;
    }

    search() {
        if (/#\d+/.test(this.queryString)) {
            this.router.navigate([this.queryString.substring(1)], { relativeTo: this.route.firstChild });
        } else {
            this.router.navigate(['.'], { queryParams: { query: this.queryString}, relativeTo: this.route.firstChild });
        }
    }
}
