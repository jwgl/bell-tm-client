import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CheckService } from './check.service';

const dateLabels: { [key: string]: string } = {
    todo: '申请时间',
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

    constructor(
        private service: CheckService,
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

    get dateLabel(): string {
        return dateLabels[this.type];
    }
}
