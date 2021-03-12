import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Dialog } from 'core/dialogs';

import { ProjectOptionDialog } from './project-option.dialog';
import { FormService } from '../form.service';

@Component({
    templateUrl: 'project-select.component.html',
})
export class ProjectSelectComponent {
    departments: any;
    subtypes: any;
    middleYears: any;
    knotYears: any;
    options: any;
    taskId: number;
    list: any;
    reportType: number;
    projectsSelected: any[];
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
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: FormService,
        private dialog: Dialog,
    ) {
        const params = this.route.snapshot.params;
        this.taskId = params['id'];
        this.service.loadDataForProjectOptions(this.taskId).subscribe(dto => {
            this.departments = dto.departments;
            this.subtypes = dto.subtypes;
            this.middleYears = dto.middleYears;
            this.knotYears = dto.knotYears;
        });
    }

    query() {
        this.dialog.open(ProjectOptionDialog, {
            departments: this.departments,
            subtypes: this.subtypes,
            middleYears: this.middleYears,
            knotYears: this.knotYears,
        }).then(result => {
            if (result.reportType) {
                this.reportType = result.reportType;
                result.queryType = 'forCheck';
                this.service.loadProjects(this.taskId, result).subscribe(dto => {
                    this.list = dto;
                    this.projectsSelected = this.list;
                });
            } else {
                alert('请先选择检查阶段！');
            }
        });
    }

    addForCheck() {
        if (this.projectsSelected) {
            const idList = this.projectsSelected.filter(d => d.checked).map(s => s.id);
            this.service.batchCreateReview(this.taskId, this.reportType, idList).subscribe(() => {
                this.router.navigate(['../'], { relativeTo: this.route });
            });
        }
    }

    onSelectProject(checkedList: any[]) {
        this.projectsSelected = checkedList;
    }
}
