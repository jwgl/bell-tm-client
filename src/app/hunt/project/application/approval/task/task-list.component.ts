import { Component } from '@angular/core';

import { Subject } from 'rxjs';

import { ApprovalService } from '../approval.service';

@Component({
    styleUrls: ['task-list.component.scss'],
    templateUrl: 'task-list.component.html',
})
export class TaskListComponent {
    tasks: any[];
    reportTypeLabels = ['', '', '年度', '中期', '结题'];

    constructor(
        private service: ApprovalService) {
        this.service.loadTaskList().subscribe(dto => {
            this.tasks = dto;
        });
    }

    toggle(subject: Subject<void>, task: any): void {
        this.service.loadReviewCounts(task.id).subscribe(dto => {
            task.reviewCounts = dto;
            subject.next();
        });
    }
}
