import { Component } from '@angular/core';

import { ListGroup } from './list-group.model';
import { Workflow } from './workflow.service';

@Component({
    selector: 'tm-workflow-nav-tabs',
    templateUrl: 'nav-tabs.component.html',
})
export class WorkflowNavTabsComponent {
    constructor(private workflow: Workflow) { }

    get group(): ListGroup {
        return this.workflow.listGroup;
    }
}
