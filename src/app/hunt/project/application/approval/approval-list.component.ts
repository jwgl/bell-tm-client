import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApprovalService } from './approval.service';
const dateLabels: { [key: string]: string } = {
    todo: '申请时间',
    done: '审批时间',
    undefined: '申请时间',
};

@Component({
    styleUrls: ['approval-list.component.scss'],
    templateUrl: 'approval-list.component.html',
})
export class ApplicationApprovalListComponent {
    list: any[];
    type: string;

    constructor(
        private service: ApprovalService,
        route: ActivatedRoute,
    ) {
        route.params.subscribe(params => {
            this.type = params['type'];
            this.service.loadList({
                taskId: params['taskId'],
                type: params['type'] ? params['type'] : null,
            }).subscribe(dto => this.list = dto);
        });
    }

    // checkBox勾选锁住，取消解锁
    lockAll(checked: boolean) {
        const idList = this.list.map(s => s.id);
        this.service.lockOrUnlock({ ids: idList, checked: checked }).subscribe(() => {
            this.list.forEach(item => item.locked = checked);
        });
    }

    lockItem(id: number, checked: boolean) {
        this.service.lockOrUnlock({ ids: [id], checked: checked }).subscribe();
    }

    get dateLabel(): string {
        return dateLabels[this.type];
    }
}
