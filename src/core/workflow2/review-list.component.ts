import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ReviewList } from './review-list.model';

@Component({
    selector: 'tm-workflow-list',
    styleUrls: ['review-list.component.scss'],
    templateUrl: 'review-list.component.html',
})
export class WorkflowReviewListComponent {
    selectedTask: string;
    maxPage: number;

    list: ReviewList;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.route.data.subscribe((data: { list: ReviewList }) => {
            if (data.list.type) {
                this.list = data.list;
            } else {
                this.router.navigate(['./', { type: 'todo' }], { relativeTo: this.route });
            }
        });
    }

    onActivate(reivewItemComponent: any) {
        reivewItemComponent.onComplete.subscribe((taskId: string) => {
            if (this.list.type == 'todo') {
                const task = this.list.items.find(it => it.id == taskId);
                const index = this.list.items.indexOf(task);
                this.list.items.splice(index, 1);
                const next = this.list.items.length > index
                    ? this.list.items[index]
                    : this.list.items.length > 0
                        ? this.list.items[0]
                        : null;
                this.router.navigate(next ? [next.id, { formId: next.formId }] : ['./'], { relativeTo: this.route });
            }
        });
    }

    get prevLink(): any[] {
        return this.list.page <= 0 ? [] : ['./', { type: this.list.type, page: this.list.page - 1 }]
    }

    get nextLink(): any[] {
        return this.list.page >= this.maxPage ? [] : ['./', { type: this.list.type, page: this.list.page + 1 }];
    }
}
