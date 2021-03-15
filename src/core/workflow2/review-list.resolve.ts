import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReviewList } from './review-list.model';
import { WorkflowService } from './workflow-review.service';

@Injectable()
export class ReviewListResolve implements Resolve<ReviewList> {
    size: number = 10;

    constructor(private workflow: WorkflowService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReviewList> {
        const type = route.params['type'];
        if (!type) {
            return of(new ReviewList(null, null));
        } else {
            switch (type) {
                case 'todo':
                    return this.workflow.loadTasks().pipe(
                        map(items => new ReviewList(type, items)),
                    );
                case 'done':
                    const page = parseInt(route.params['page'] || '0');
                    return this.workflow.loadSteps(page, this.size).pipe(
                        map(result => {
                            const list = new ReviewList(type, result.items);
                            list.page = page;
                            list.size = this.size;
                            list.total = result.totalCount;
                            return list;
                        }),
                    );
            }
        }
    }
}
