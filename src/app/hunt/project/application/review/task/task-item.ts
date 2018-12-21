import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskForm } from '../../../../settings/task/shared/form.model';
import { ReviewService } from '../review.service';

@Component({
    templateUrl: 'task-item.html',
})
export class TaskItemComponent {
    task: TaskForm;
    counts: any;

    constructor(
        private route: ActivatedRoute,
        private service: ReviewService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadTaskItem<{ task: any, applications: any }>(params['taskId']).subscribe(dto => {
            this.task = new TaskForm(dto.task);
            this.counts = dto.counts;
        });
    }

    get isCheckTime(): boolean {
        return this.task.type === 'CHECK';
    }
}
