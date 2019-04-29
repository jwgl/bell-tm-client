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
