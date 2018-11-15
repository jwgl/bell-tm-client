import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dialog } from 'core/dialogs';
import { ListOption } from '../common/list-group.model';

import { ReviewService } from '../review.service';


@Component({
    styleUrls: ['review-list.component.scss'],
    templateUrl: 'review-list.component.html',
})
export class ReviewListComponent {
    list: any[];

    options: ListOption[];
    _mode: string;
    counts: any;

    constructor(
        private service: ReviewService,
        private route: ActivatedRoute,
        private dialog: Dialog,
    ) {
        const mode = this._mode = this.route.snapshot.data['mode'];
        this.loadData(mode);
    }

    loadData(mode: string) {
        this.service.loadList({
            type: mode,
        }).subscribe((dto: any) => {
            this.list = dto.list;
            this.counts = dto.counts;
            this.options = [
                {
                    type: 'todo', label: '未评审',
                    count: this.counts.todo, active: !mode ? true : mode === 'todo',
                },
                {
                    type: 'done', label: '已评审', count: this.counts.done,
                    active: !mode ? false : mode === 'done',
                },
            ];
        });
    }
}
