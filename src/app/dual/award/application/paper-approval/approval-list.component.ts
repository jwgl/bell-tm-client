import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { ReviewList } from 'core/workflow';
import { PaperApprovalService } from './approval.service';
@Component({
    styleUrls: ['approval-list.component.scss'],
    templateUrl: 'approval-list.component.html',
})
export class PaperApprovalListComponent {
    list: ReviewList;

    constructor(
        route: ActivatedRoute,
        private service: PaperApprovalService) {
        route.data.subscribe((data: { list: ReviewList }) => {
            this.list = data.list;
        });
    }

    downloadUrl(): string {
        return `${this.service.getDownloadUrl(this.list.items[0].awardId)}`;
    }

    get downloadAble(): boolean {
        const match = window.location.href.match(/\/todo+/);
        return !_.isEmpty(match);
    }
}
