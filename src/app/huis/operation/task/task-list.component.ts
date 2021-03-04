import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OperationTaskService } from './operation-task.service';
import { OperationStepService } from './operation-step.service';
import { OperationTaskItemComponent } from './task-item.component';

@Component({
    styleUrls: ['task-list.component.scss'],
    templateUrl: 'task-list.component.html',
})
export class OperationTaskListComponent {
    tasks: any[];
    selectedTask: string;
    returnUrl: string;
    type: string;
    page: number;
    size = 10;
    maxPage: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private taskService: OperationTaskService,
        private stepService: OperationStepService,
    ) {
        this.route.params.subscribe(params => {
            this.type = params['type'];
            if (!this.type) {
                this.router.navigate(['./', { type: 'todo' }], { relativeTo: this.route });
            } else {
                switch (this.type) {
                    case 'todo':
                        this.loadTasks();
                        break;
                    case 'done':
                        this.page = parseInt(params['page'] || '0');
                        this.loadSteps();
                        break;
                }
            }
        });
    }

    loadTasks() {
        this.taskService.loadList().subscribe(tasks => {
            this.tasks = tasks;
            if (this.router.url.endsWith('/operationTasks')) {
                if (this.tasks.length > 0) {
                    this.router.navigate([this.tasks[0].id], { relativeTo: this.route });
                }
            }
        });
    }

    loadSteps() {
        this.stepService.loadPage(this.page, this.size).subscribe(result => {
            this.tasks = result.items;
            this.maxPage = Math.floor((result.totalCount - 1) / this.size);
            if (this.router.url.endsWith('/operationTasks')) {
                if (this.tasks.length > 0) {
                    this.router.navigate([this.tasks[0].id], { relativeTo: this.route });
                }
            }
        });
    }

    onActivate(taskItemComponent: any) {
        if (taskItemComponent instanceof OperationTaskItemComponent) {
            taskItemComponent.onComplete.subscribe(taskId => {
                if (this.type == 'todo') {
                    const task = this.tasks.find(it => it.id == taskId);
                    const index = this.tasks.indexOf(task);
                    this.tasks.splice(index, 1);
                    const next = this.tasks.length > index
                        ? this.tasks[index]
                        : this.tasks.length > 0
                            ? this.tasks[0]
                            : null;
                    this.router.navigate(next ? [next.id, { formId: next.formId }] : ['./'], { relativeTo: this.route });
                }
            });
        }
    }

    get prevLink(): any[] {
        return this.page <= 0 ? [] : ['./', { type: this.type, page: this.page - 1 }]
    }

    get nextLink(): any[] {
        return this.page >= this.maxPage ? [] : ['./', { type: this.type, page: this.page + 1 }];
    }
}
