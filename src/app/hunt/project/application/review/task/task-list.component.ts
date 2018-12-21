import { Component } from '@angular/core';

import { ReviewService } from '../review.service';

@Component({
    styleUrls: ['task-list.component.scss'],
    templateUrl: 'task-list.component.html',
})
export class TaskListComponent {
    tasks: any[];

    constructor(
        private service: ReviewService) {
        this.service.loadTaskList().subscribe(dto => {
            this.tasks = dto;
        });
    }
}
