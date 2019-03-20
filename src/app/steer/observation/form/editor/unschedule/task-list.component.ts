import { Component } from '@angular/core';

import { UnScheduleService } from './unschedule.service';
@Component({
    templateUrl: 'task-list.component.html',
})
export class TaskListComponent {
    teacher: any;
    tasks: any[];

    constructor(private service: UnScheduleService) { }

    onTeacherSelected(teacher: any): void {
        this.teacher = teacher;
    }

    query() {
        this.service.findTask(this.teacher.id).subscribe(dto => {
            this.tasks = dto;
        });
    }
}
