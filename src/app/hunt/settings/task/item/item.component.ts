import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import * as _ from 'lodash';

import {FormService} from '../form.service';
import {TaskForm} from '../shared/form.model';

@Component({
    templateUrl: 'item.component.html',
})
export class TaskItemComponent {
    vm: TaskForm;

    constructor(
        private route: ActivatedRoute,
        private service: FormService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe(dto => {
            this.vm = new TaskForm(dto);
        });
    }
}
