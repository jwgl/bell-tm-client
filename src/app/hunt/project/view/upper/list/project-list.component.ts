import { Component } from '@angular/core';

import { Dialog } from 'core/dialogs';

import { ProjectOptionDialog } from './project-option.dialog';
import { ProjectService } from '../viewer.service';

@Component({
    templateUrl: 'project-list.component.html',
})
export class ProjectListComponent {
    subtypes: any;
    middleYears: any;
    knotYears: any;
    departments: any;
    createAble: boolean;
    options: any;
    list: any;
    reportType: number;
    q: string;
    ths = [
        {id: 'name', label: '项目名称', order: true},
        {id: 'code', label: '项目编号', order: true},
        {id: 'level', label: '等级', filter: true},
        {id: 'subtype', label: '项目类型', filter: true},
        {id: 'principalName', label: '负责人', order: true},
        {id: 'dateStart', label: '立项时间', order: true},
        {id: 'middleYear', label: '中期', order: true},
        {id: 'knotYear', label: '结题', order: true},
        {id: 'hasMid', label: '已中检', order: true},
        {id: 'delayTimes', label: '延期', order: true},
        {id: 'status', label: '建设情况', order: true},
    ];

    constructor(
        private service: ProjectService,
        private dialog: Dialog,
    ) {
        this.service.loadList(this.service.queryOptions).subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any) {
        this.list = dto.list;
        this.subtypes = dto.subtypes;
        this.middleYears = dto.middleYears;
        this.knotYears = dto.knotYears;
        this.departments = dto.departments;
        this.createAble = dto.createAble;
    }

    query() {
        this.dialog.open(ProjectOptionDialog, {
            subtypes: this.subtypes,
            middleYears: this.middleYears,
            knotYears: this.knotYears,
            departments: this.departments,
        }).then(result => {
            this.service.loadList(result).subscribe(dto => this.loadData(dto));
        });
    }

    find() {
        this.service.loadList({q: this.q}).subscribe(dto => this.loadData(dto));
    }
}
