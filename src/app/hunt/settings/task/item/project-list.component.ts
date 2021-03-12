import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonDialog } from 'core/common-dialogs';

import { FormService } from '../form.service';

@Component({
    styleUrls: ['project-list.component.scss'],
    templateUrl: 'project-list.component.html',
})
export class ProjectListComponent {
    list: any[];

    taskId: number;
    type: string;

    options = [
        { label: '年度', type: 2, count: 0 },
        { label: '中期', type: 3, count: 0 },
        { label: '结题', type: 4, count: 0 },
    ];

    ths = [
        {id: 'name', label: '项目名称', order: true},
        {id: 'code', label: '项目编号', order: true},
        {id: 'principalName', label: '负责人', order: true},
        {id: 'level', label: '等级', filter: true},
        {id: 'subtype', label: '项目类型', filter: true},
        {id: 'departmentName', label: '单位', filter: true},
        {id: 'dateStart', label: '立项时间', order: true},
        {id: 'middleYear', label: '中期', order: true},
        {id: 'knotYear', label: '结题', order: true},
        {id: 'status', label: '审批状态', order: true},
    ];

    constructor(
        private service: FormService,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
    ) {
        this.route.params.subscribe(params => {
            this.taskId = params['id'];
            this.type = params['type'];
            this.loadData();
        }
        );
    }

    loadData() {
        this.service.loadProjects(this.taskId, {
            queryType: 'checked',
            reportType: this.type,
        }).subscribe((dto: any) => {
            this.list = dto.list;
            const counts = dto.counts;
            this.options.forEach(item => {
                const count = counts.find(c => c.reportType === item.type);
                if (count) {
                    item.count = count.value;
                }
            });
        });
    }

    removable(item: any): boolean {
        return item && item.state === 'CREATED';
    }

    remove(item: any) {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.removeProject(item.taskId, item.id).subscribe(() => this.loadData());
        });
    }
}
