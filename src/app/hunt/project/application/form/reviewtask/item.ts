import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskForm } from '../../../../settings/task/shared/form.model';
import { ProjectFormService } from '../form.service';

@Component({
    templateUrl: 'item.html',
})
export class TaskItemComponent {
    task: TaskForm;
    applications: any[];

    constructor(
        private route: ActivatedRoute,
        private service: ProjectFormService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadTaskItem<{ task: any, applications: any }>(params['id']).subscribe(dto => {
            this.task = new TaskForm(dto.task);
            this.applications = dto.applications;
        });
    }

    get creatAble(): boolean {
        return this.task.status === 'APPLICATION';
    }
}
