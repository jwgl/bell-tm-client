import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dialog } from 'core/dialogs';

import { TeamDialog } from './expert-team.dialog';
import { ApprovalService } from './approval.service';
const dateLabels: { [key: string]: string } = {
    todo: '申请时间',
    done: '审批时间',
    expr: '审批时间',
    undefined: '申请时间',
};

@Component({
    styleUrls: ['approval-list.component.scss'],
    templateUrl: 'approval-list.component.html',
})
export class ApplicationApprovalListComponent {
    list: any[];
    type: string;
    projectsSelected: any[];

    ths = [
        { id: 'name', label: '项目名称', order: true },
        { id: 'principalName', label: '负责人', order: true },
        { id: 'phone', label: '电话', order: true },
        { id: 'level', label: '等级', filter: true },
        { id: 'subtype', label: '项目类型', filter: true },
        { id: 'date', label: '申请时间', order: true },
        { id: 'status', label: '状态', order: true },
        { id: 'delayTimes', label: '结论', order: true },
    ];

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
            const dateTh = this.ths.find(th => th.id === 'date');
            dateTh.label = this.dateLabel;
            this.service.loadList({
                taskId: params['taskId'],
                type: params['type'] ? params['type'] : null,
                reportType: params['reportType'] ? params['reportType'] : null,
            }).subscribe(dto => {
                this.list = dto;
                this.projectsSelected = this.list;
            });
        });
    }

    onSelectProject(checkedList: any[]) {
        this.projectsSelected = checkedList;
    }

    lockAll(checked: boolean) {
        const idList = this.projectsSelected.filter(d => d.checked).map(s => s.id);
        this.service.batchUpdate({ ids: idList, checked, type: 'lock' }).subscribe(() => {
            this.list.forEach(item => {
                if (idList.some(id => item.id === id)) {
                    item.locked = checked;
                }
            });
        });
    }

    get dateLabel(): string {
        return dateLabels[this.type];
    }

    get reviewAble(): boolean {
        return this.type === 'todo';
    }

    lockClass(status: boolean): string {
        return status ? 'lock' : 'lock-open';
    }

    setExpert() {
        const idList = this.projectsSelected.filter(d => d.checked).map(s => s.id);
        this.dialog.open(TeamDialog).then(result => {
            this.service.batchUpdate({ ids: idList, teamNum: result, type: 'team' }).subscribe(() => {
                this.loadData();
            });
        });
    }
}
