import { Component } from '@angular/core';

import { CheckService } from '../check.service';

@Component({
    styleUrls: ['task-list.component.scss'],
    templateUrl: 'task-list.component.html',
})
export class TaskListComponent {
    tasks: any[];

    constructor(
        private service: CheckService) {
        this.service.loadTaskList().subscribe(dto => {
            this.tasks = dto;
        });
    }
}
