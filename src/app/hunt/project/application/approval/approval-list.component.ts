import { Component, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dialog } from 'core/dialogs';

import { CheckboxSelectorComponent } from 'core/common-directives';

import { TeamDialog } from './expert-team.dialog';
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
    @ViewChildren(CheckboxSelectorComponent) selectors: QueryList<CheckboxSelectorComponent>;
    list: any[];
    type: string;

    constructor(
        private service: ApprovalService,
        private route: ActivatedRoute,
        private dialog: Dialog,
    ) {
        this.loadData();
    }

    loadData() {
        this.route.params.subscribe(params => {
            this.type = params['type'];
            this.service.loadList({
                taskId: params['taskId'],
                type: params['type'] ? params['type'] : null,
            }).subscribe(dto => this.list = dto);
        });
    }

    checkAll(checked: boolean) {
        this.selectors.forEach(checkbox => checkbox.checked = checked);
    }

    lockAll(checked: boolean) {
        const idList = this.list.map(s => s.id);
        this.service.batchUpdate({ ids: idList, checked: checked, type: 'lock' }).subscribe(() => {
            this.list.forEach(item => item.locked = checked);
        });
    }

    get dateLabel(): string {
        return dateLabels[this.type];
    }

    lockClass(status: boolean): string {
        return status ? 'lock' : 'lock-open';
    }

    setExpert() {
        const idList = this.list.map(s => s.id);
        this.dialog.open(TeamDialog).then(result => {
            this.service.batchUpdate({ ids: idList, teamNum: result, type: 'team' }).subscribe(() => {
                this.loadData();
            });
        });
    }
}
