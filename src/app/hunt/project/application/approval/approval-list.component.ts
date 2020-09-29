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
    ids: any[]; // for hunt-grid
    flush: boolean;

    ths = [
        { id: 'name', label: '项目名称', order: true },
        { id: 'principalName', label: '负责人', order: true },
        { id: 'phone', label: '电话', order: true },
        { id: 'level', label: '等级', filter: true },
        { id: 'subtype', label: '项目类型', filter: true },
        { id: 'date', label: '申请时间', order: true },
        { id: 'status', label: '状态', order: true },
        { id: 'conclusionOfUniversity', label: '结论' },
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
            this.type = this.route.snapshot.queryParams['type'];
            const reportType = this.route.snapshot.queryParams['reportType'];
            const dateTh = this.ths.find(th => th.id === 'date');
            dateTh.label = this.dateLabel;
            this.service.loadList({
                taskId: params['taskId'],
                type: this.type ? this.type : null,
                reportType: reportType ? reportType : null,
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
        if (this.ids && this.ids.length > 0) {
           this.service.batchUpdate({ ids: this.ids, checked, type: 'lock' }).subscribe(() => {
            this.list.forEach(item => {
                if (this.ids.some(id => item.id === id)) {
                    item.locked = checked;
                }
            });
            if (this.flush === undefined) {
                this.flush = true;
            } else {
                this.flush = !this.flush;
            }
        });
        }
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
        if (this.ids && this.ids.length > 0) {
            this.dialog.open(TeamDialog).then(result => {
                this.service.batchUpdate({ ids: this.ids, teamNum: result, type: 'team' }).subscribe(() => {
                    this.loadData();
                });
                if (this.flush === undefined) {
                    this.flush = true;
                } else {
                    this.flush = !this.flush;
                }
            });
        }
    }

    onRowSelected(ids: any) {
        this.ids = ids;
    }
}
