import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { ReviewList } from './review-list.model';
import { Workflow } from './workflow.service';

@Injectable()
export class WorkflowListResolve implements Resolve<ReviewList> {
    constructor(private workflow: Workflow) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReviewList> {
        const options: { [key: string]: any } = {};
        options.type = route.params['type'];
        options.offset = route.queryParams['offset'] ? parseInt(route.queryParams['offset'], 10) : 0;
        options.max = route.queryParams['max'] ? parseInt(route.queryParams['max'], 10) : 10;
        if (route.queryParams['query']) {
            options.query = route.queryParams['query'];
        }
        return this.workflow.loadList(options);
    }
}
