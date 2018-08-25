import { Component } from '@angular/core';

import { ListGroup } from './list-group.model';
import { Workflow } from './workflow.service';

@Component({
    selector: 'tm-workflow-list-group',
    templateUrl: 'list-group.component.html',
})
export class WorkflowListGroupComponent {
    constructor(private workflow: Workflow) { }

    get group(): ListGroup {
        return this.workflow.listGroup;
    }
}
