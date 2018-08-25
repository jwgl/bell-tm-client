import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Workflow } from './workflow.service';

@Injectable()
export class WorkflowItemResolve implements Resolve<any> {
    constructor(private workflow: Workflow, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const type = route.params['type'];
        const id = route.params['id'];
        const query = route.params['query'];
        const wi = route.params['wi'];
        return this.workflow.loadItem(type, id, wi, query);
    }
}
