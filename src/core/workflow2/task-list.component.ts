import { Component, Input } from '@angular/core';
import { WorkflowTask } from './task-list.model';

@Component({
    selector: 'tm-workflow-task-list',
    styleUrls: ['task-list.component.scss'],
    templateUrl: 'task-list.component.html',
})
export class WorkflowTaskListComponent {
    @Input()
    list: WorkflowTask[];
}
