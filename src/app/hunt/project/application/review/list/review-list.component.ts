import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dialog } from 'core/dialogs';

import { ListOption } from '../common/list-group.model';
import { ReviewService } from '../review.service';

import { ReviewDialog } from './review.dialog';

@Component({
    styleUrls: ['review-list.component.scss'],
    templateUrl: 'review-list.component.html',
})
export class ReviewListComponent {
    list: any[];

    options: ListOption[];
    counts: any;
    reviewType: number;
    type: string;

    constructor(
        private service: ReviewService,
        private route: ActivatedRoute,
        private dialog: Dialog,
    ) {
        this.route.params.subscribe(params => {
            this.reviewType = params['reviewType'];
            this.type = params['type'];
            this.loadData(this.reviewType, this.type);
        }
        );
    }

    loadData(reviewType: number, mode: string) {
        const reportTypes = ['application', 'middle', 'knot'];
        this.service.loadList({
            reportType: reportTypes[reviewType],
            type: mode,
        }).subscribe((dto: any) => {
            this.list = dto.list;
            this.counts = dto.counts;
            this.options = [
                {
                    type: 'todo', label: '未评审',
                    count: this.counts.todo, active: mode === 'todo',
                },
                {
                    type: 'done', label: '已评审',
                    count: this.counts.done, active: mode === 'done',
                },
            ];
        });
    }

    review(id: number) {
        this.service.loadItem(id).subscribe(dto =>
            this.dialog.open(ReviewDialog, {reviewInfo: dto}).then(result => {
                this.service.update(id, result).subscribe(() => this.loadData(this.reviewType, this.type));
            })
        );
    }

    submit(id: number) {
        this.service.submit(id).subscribe(() => this.loadData(this.reviewType, this.type));
    }
}
