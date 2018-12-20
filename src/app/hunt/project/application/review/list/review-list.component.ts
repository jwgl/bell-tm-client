import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dialog } from 'core/dialogs';

import { ReviewService } from '../review.service';

import { ReviewDialog } from './review.dialog';
import { ExpertReview } from '../expert-review.model';

@Component({
    styleUrls: ['review-list.component.scss'],
    templateUrl: 'review-list.component.html',
})
export class ReviewListComponent {
    list: any[];

    counts: any;
    reviewType: number;
    type: string;

    options = [
        { label: '未评审', type: 'tobe', count: 0 },
        { label: '已评审', type: 'done', count: 0 },
    ];

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
            this.list = dto.list ? dto.list.map(r => new ExpertReview(r)) : null;
            this.counts = dto.counts;
            this.options[0].count = this.counts.todo;
            this.options[1].count = this.counts.done;
        });
    }

    review(id: number) {
        this.service.loadItem(id).subscribe(dto =>
            this.dialog.open(ReviewDialog, { reviewInfo: dto }).then(result => {
                this.service.update(id, result).subscribe(() => this.loadData(this.reviewType, this.type));
            })
        );
    }

    submit(id: number) {
        this.service.submit(id).subscribe(() => this.loadData(this.reviewType, this.type));
    }
}
