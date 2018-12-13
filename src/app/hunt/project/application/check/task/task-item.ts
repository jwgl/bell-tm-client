import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskForm } from '../../../../settings/task/shared/form.model';
import { CheckService } from '../check.service';

@Component({
    templateUrl: 'task-item.html',
})
export class TaskItemComponent {
    task: TaskForm;
    applications: any[];

    constructor(
        private route: ActivatedRoute,
        private service: CheckService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadTaskItem<{ task: any, applications: any }>(params['taskId']).subscribe(dto => {
            this.task = new TaskForm(dto.task);
            this.applications = dto.applications;
        });
    }
}