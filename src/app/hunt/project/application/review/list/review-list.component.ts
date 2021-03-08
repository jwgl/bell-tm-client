import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dialog } from 'core/dialogs';

import { ReviewService } from '../review.service';

import { ReviewDialog } from './review.dialog';
import { ExpertReview } from '../expert-review.model';

@Component({
    templateUrl: 'review-list.component.html',
})
export class ReviewListComponent {
    list: any[];

    counts: any;
    taskId: string;
    reviewType: string;
    type: string;
    projectsSelected: any[];

    options = [
        { label: '未评审', type: 'todo', count: 0 },
        { label: '已评审', type: 'done', count: 0 },
    ];
    ths = [
        { id: 'name', label: '项目名称', order: true },
        { id: 'principalName', label: '负责人', order: true },
        { id: 'departmentName', label: '学院', order: true },
        { id: 'level', label: '等级', order: true },
        { id: 'subtype', label: '项目类型', filter: true },
        { id: 'conclusion', label: '结论', order: true },
        { id: 'action', label: '' },
    ];

    constructor(
        private service: ReviewService,
        private route: ActivatedRoute,
        private dialog: Dialog,
    ) {
        this.route.params.subscribe(params => {
            this.taskId = params['taskId'];
            this.reviewType = params['reviewType'];
            this.type = params['type'];
            this.loadData();
        }
        );
    }

    loadData() {
        // const reportTypes = ['application', 'middle', 'knot'];
        this.service.loadList({
            taskId: this.taskId,
            reviewType: this.reviewType,
            type: this.type,
        }).subscribe((dto: any) => {
            this.list = dto.list ? dto.list.map(r => new ExpertReview(r)) : null;
            this.counts = dto.counts;
            this.options[0].count = this.counts.todo;
            this.options[1].count = this.counts.done;
            this.projectsSelected = this.list;
        });
    }

    review(id: number) {
        this.service.loadItem(id).subscribe(dto =>
            this.dialog.open(ReviewDialog, { reviewInfo: dto }).then(result => {
                this.service.update(id, result).subscribe(() => this.loadData());
            })
        );
    }

    submit(id: number) {
        this.service.submit(id).subscribe(() => this.loadData());
    }

    downloadUrl(): string {
        if (this.projectsSelected && this.projectsSelected.length > 0) {
            const idList = this.projectsSelected.filter(d => d.checked).map(s => s.id).join(';');
            return `/api/hunt/attachments?role=EXPERT&idList=${idList}`;
        }
    }

    onSelectProject(checkedList: any[]) {
        this.projectsSelected = checkedList;
    }
}
