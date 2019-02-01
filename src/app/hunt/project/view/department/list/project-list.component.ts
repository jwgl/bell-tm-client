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
