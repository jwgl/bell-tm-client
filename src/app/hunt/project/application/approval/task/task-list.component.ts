import { Component } from '@angular/core';

import { ApprovalService } from '../approval.service';

@Component({
    styleUrls: ['task-list.component.scss'],
    templateUrl: 'task-list.component.html',
})
export class TaskListComponent {
    tasks: any[];

    constructor(
        private service: ApprovalService) {
        this.service.loadTaskList().subscribe(dto => {
            this.tasks = dto;
        });
    }
}
