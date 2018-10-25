import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskForm } from '../../../../settings/task/shared/form.model';
import { ProjectFormService } from '../form.service';

@Component({
    templateUrl: 'item.html',
})
export class TaskItemComponent {
    vm: TaskForm;

    constructor(
        private route: ActivatedRoute,
        private service: ProjectFormService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadTaskItem(params['id']).subscribe(dto => {
            this.vm = new TaskForm(dto);
        });
    }
}
