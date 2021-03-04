import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OperationForm } from '../shared/operation-form.model';
import { OperationStepService } from './operation-step.service';
import { OperationTaskService } from './operation-task.service';

@Component({
    templateUrl: 'task-item.component.html',
})
export class OperationTaskItemComponent {
    @Output() onComplete = new EventEmitter<string>();
    
    taskId: string;
    formId: string;
    form: OperationForm;
    type: string;
    comment: string;
    taskVariable: {
        name: string;
        values: string[];
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private taskService: OperationTaskService,
        private stepService: OperationStepService,
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
            this.taskVariable = dto.taskVariable;
            this.form = new OperationForm(dto.form);
        });
    }

    loadStep() {
        this.stepService.loadStep(this.taskId, this.formId).subscribe((dto: any) => {
            this.taskVariable = dto.taskVariable;
            this.form = new OperationForm(dto.form);
        });
    }

    onClick(action: string) {
        this.taskService.complete(this.taskId, {
            result: {
                key: this.taskVariable.name,
                value: action
            },
            comment: this.comment,
        }).subscribe(() => {
            this.onComplete.emit(this.taskId);
        });
    }

    getLabel(action: string) {
        switch(action) {
            case 'ACCEPT': return '同意';
            case 'REJECT': return '退回';
            case 'SUBMIT': return '提交';
            case 'SEND_BACK': return '驳回';
            case 'TERMINATE': return '终止';
        }
    }
}
