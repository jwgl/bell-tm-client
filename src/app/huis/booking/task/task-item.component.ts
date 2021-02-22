import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BookingForm } from '../shared/booking-form.model';
import { BookingTaskService } from './booking-task.service';
import { BookingStepService } from './booking-step.service';

@Component({
    templateUrl: 'task-item.component.html',
})
export class BookingTaskItemComponent {
    @Output() onComplete = new EventEmitter<string>();

    taskId: string;
    formId: string;
    form: BookingForm;
    comment: string;
    type: string;
    variable: {
        name: string;
        values: string[];
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private taskService: BookingTaskService,
        private stepService: BookingStepService,
    ) {
        this.route.params.subscribe(params => {
            this.taskId = params['id'];
            this.formId = params['formId'];
            this.type = params['type'];
            this.comment = undefined;

            switch (this.type) {
                case 'item':
                case 'todo': this.loadTask(); break;
                case 'done': this.loadStep(); break;
            }
        });
    }

    loadTask() {
        this.taskService.loadTask(this.taskId, this.formId).subscribe((dto: any) => {
            this.variable = dto.variable;
            this.form = new BookingForm(dto.form);
        });
    }

    loadStep() {
        this.stepService.loadStep(this.taskId, this.formId).subscribe((dto: any) => {
            this.variable = dto.variable;
            this.form = new BookingForm(dto.form);
        });
    }

    onClick(action: string) {
        this.taskService.complete(this.taskId, {
            result: {
                key: this.variable.name,
                value: action
            },
            comment: this.comment,
        }).subscribe(() => {
            this.onComplete.emit(this.taskId);
        });
    }

    getLabel(action: string) {
        switch (action) {
            case 'ACCEPT': return '同意';
            case 'REJECT': return '退回';
            case 'SUBMIT': return '提交';
            case 'SEND_BACK': return '驳回';
            case 'TERMINATE': return '终止';
        }
    }
}
