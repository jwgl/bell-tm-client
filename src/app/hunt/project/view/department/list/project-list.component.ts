import { Component } from '@angular/core';

import { Dialog } from 'core/dialogs';

import { ProjectOptionDialog } from './project-option.dialog';
import { ProjectDepartmentService } from '../viewer.service';

@Component({
    templateUrl: 'project-list.component.html',
})
export class ProjectDepartmentListComponent {
    subtypes: any;
    middleYears: any;
    knotYears: any;
    options: any;
    list: any;
    reportType: number;
    ths = [
        {id: 'name', label: '项目名称', order: true},
        {id: 'code', label: '项目编号', order: true},
        {id: 'level', label: '等级', filter: true},
        {id: 'subtype', label: '项目类型', filter: true},
        {id: 'principalName', label: '负责人', order: true},
        {id: 'dateStart', label: '立项时间', order: true},
        {id: 'middleYear', label: '中期', order: true},
        {id: 'knotYear', label: '结题', order: true},
        {id: 'dateFinished', label: '结题时间', order: true},
        {id: 'delayTimes', label: '延期', order: true},
        {id: 'status', label: '建设情况', order: true},
    ];

    constructor(
        private service: ProjectDepartmentService,
        private dialog: Dialog,
    ) {
        this.service.loadList(this.service.queryOptions).subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any) {
        this.list = dto.list;
        this.subtypes = dto.subtypes;
        this.middleYears = dto.middleYears;
        this.knotYears = dto.knotYears;
    }

    query() {
        this.dialog.open(ProjectOptionDialog, {
            subtypes: this.subtypes,
            middleYears: this.middleYears,
            knotYears: this.knotYears,
        }).then(result => {
            this.service.loadList(result).subscribe(dto => this.loadData(dto));
        });
    }
}
