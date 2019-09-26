import { Component } from '@angular/core';

import { TaskForm } from '../../../../settings/task/shared/form.model';

import { ProjectFormService } from '../form.service';

import './task.model';

@Component({
    styleUrls: ['list.scss'],
    templateUrl: 'list.html',
})
export class TaskListComponent {
    tasks: TaskForm[];

    constructor(
        private service: ProjectFormService) {
        this.service.loadTaskList().subscribe((dto: any[]) => {
            this.loadData(dto);
        });
    }

    loadData(dto: any) {
        this.tasks = dto.map((data: any) => {
            const task = new TaskForm(data);
            task.countApplication = data.countApplication;
            task.status = data.status;
            return task;
        });
    }

    allTask() {
        this.service.loadAllTask().subscribe((dto: any[]) => {
            this.loadData(dto);
        });
    }
}
