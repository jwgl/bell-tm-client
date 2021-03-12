import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StatementForm } from '../shared/statement-form.model';
import { StatementTaskService } from './statement-task.service';
import { StatementStepService } from './statement-step.service';

@Component({
    templateUrl: 'task-item.component.html',
})
export class StatementTaskItemComponent {
    @Output() onComplete = new EventEmitter<string>();
    
    taskId: string;
    formId: string;
    form: StatementForm;
    comment: string;
    type: string;
    taskVariable: {
        name: string;
        values: string[];
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private taskService: StatementTaskService,
        private stepService: StatementStepService,
    ) {
        this.route.params.subscribe(params => {
            this.taskId = params['id'];
            this.formId = params['formId'];
            this.type = params['type'];

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
            this.form = new StatementForm(dto.form);
        });
    }

    loadStep() {
        this.stepService.loadStep(this.taskId, this.formId).subscribe((dto: any) => {
            this.taskVariable = dto.taskVariable;
            this.form = new StatementForm(dto.form);
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
