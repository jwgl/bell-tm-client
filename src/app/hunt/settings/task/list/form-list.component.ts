import {Component} from '@angular/core';

import {FormService} from '../form.service';
import {TaskForm} from '../shared/form.model';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class TaskListComponent {
    tasks: TaskForm[];

    constructor(private service: FormService) {
        this.service.loadList().subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any[]) {
        this.tasks = dto.map(data => new TaskForm(data));
    }
}
