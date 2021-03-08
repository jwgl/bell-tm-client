import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CheckService } from './check.service';

const dateLabels: { [key: string]: string } = {
    todo: '申请时间',
    next: '审核时间',
    done: '审核时间',
    undefined: '申请时间',
};

@Component({
    styleUrls: ['check-list.component.scss'],
    templateUrl: 'check-list.component.html',
})
export class ApplicationCheckListComponent {
    list: any[];
    type: string;
    options = [
        { label: '应审核', type: 'tobe', count: 0 },
        { label: '待审核', type: 'todo', count: 0 },
        { label: '已审核', type: 'next', count: 0 },
        { label: '退回', type: 'expr', count: 0 },
        { label: '终审', type: 'done', count: 0 },
    ];

    constructor(
        private service: CheckService,
        route: ActivatedRoute,
    ) {
        route.params.subscribe(params => {
            this.type = params['type'];
            this.service.loadList({
                taskId: params['taskId'],
                reviewType: params['reviewType'],
                type: params['type'] ? params['type'] : null,
            }).subscribe((dto: any) => {
                this.list = dto.list;
                const c = dto.counts;
                if (c) {
                    this.options[1].count = c.countUncheck;
                    this.options[2].count = c.countPass;
                    this.options[3].count = c.countFail;
                    this.options[4].count = c.countFinal;
                    this.options[0].count = c.countPlan;
                }
            });
        });
    }

    get dateLabel(): string {
        return dateLabels[this.type];
    }

    get isFinal(): boolean {
        return this.type === 'done';
    }

    getFinalConclusion(item: any) {
        if (item) {
            switch (item.level) {
                case 'UNIVERSITY':
                    return item.conclusionOfUniversity;
                case 'PROVINCE':
                    return item.conclusionOfProvince;
                default:
                    return null;
            }
        }
        return null;
    }
}
