import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StatementTaskService } from './statement-task.service';
import { StatementStepService } from './statement-step.service';
import { StatementTaskItemComponent } from './task-item.component';

@Component({
    styleUrls: ['task-list.component.scss'],
    templateUrl: 'task-list.component.html',
})
export class StatementTaskListComponent {
    tasks: any[];
    selectedTask: string;
    returnUrl: string;
    type: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private taskService: StatementTaskService,
        private stepService: StatementStepService,
    ) {
        this.route.params.subscribe(params => {
            this.type = params['type'];
            if (!this.type) {
                this.router.navigate(['./', { type: 'todo' }], { relativeTo: this.route });
            } else {
                switch (this.type) {
                    case 'item': this.returnUrl = params['returnUrl']; break;
                    case 'todo': this.loadTasks(); break;
                    case 'done': this.loadSteps(); break;
                }
            }
        });
    }

    loadTasks() {
        this.taskService.loadList().subscribe(tasks => {
            this.tasks = tasks;
            if (this.router.url.endsWith('/statementTasks')) {
                if (this.tasks.length > 0) {
                    this.router.navigate([this.tasks[0].id], { relativeTo: this.route });
                }
            }
        });
    }

    loadSteps() {
        this.stepService.loadList().subscribe(tasks => {
            this.tasks = tasks;
            if (this.router.url.endsWith('/statementSteps')) {
                if (this.tasks.length > 0) {
                    this.router.navigate([this.tasks[0].id], { relativeTo: this.route });
                }
            }
        });
    }

    onActivate(taskItemComponent: any) {
        if (taskItemComponent instanceof StatementTaskItemComponent) {
            taskItemComponent.onComplete.subscribe(taskId => {
                if (this.type == 'todo') {
                    const task = this.tasks.find(it => it.id == taskId);
                    const index = this.tasks.indexOf(task);
                    this.tasks.splice(index, 1);
                    this.router.navigate([this.tasks.length > index
                        ? this.tasks[index].id
                        : this.tasks.length > 0
                            ? this.tasks[0].id
                            : './'], { relativeTo: this.route });
                } else if (this.type == 'item' && this.returnUrl) {
                    this.router.navigate(['../', this.returnUrl], { relativeTo: this.route });
                } 
            });
        }
    }

    get listColumnClass(): String {
        return this.type == 'item' ? 'col-md-0' : 'col-md-3';
    }

    get itemColumnClass(): String {
        return this.type == 'item' ? 'col-md-12' : 'col-md-9';
    }
}
