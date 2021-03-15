import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReviewItem } from './review-item.model';
import { WorkflowService } from './workflow-review.service';

@Injectable()
export class ReviewItemResolve implements Resolve<ReviewItem> {
    constructor(private workflow: WorkflowService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReviewItem> {
        const taskId = route.params['id'];
        const formId = route.params['formId'];
        const type = route.params['type'];

        let response: Observable<any>;
        switch (type) {
            case 'item':
            case 'todo':
                response = this.workflow.loadTask(taskId, formId);
                break;
            case 'done':
                response = this.workflow.loadStep(taskId, formId);
                break;
        }

        return response.pipe(
            map(result => {
                const reviewItem = new ReviewItem();
                reviewItem.reviewInfo = {
                    taskId, formId, type, taskVariable: result.taskVariable
                };
                reviewItem.form = result.form;
                return reviewItem;
            }),
        );
    }
}
