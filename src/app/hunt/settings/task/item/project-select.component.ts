import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

    constructor(
        private route: ActivatedRoute,
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
            this.reportType = result.reportType;
            this.service.loadProjects(this.taskId, result).subscribe(dto => this.list = dto);
        });
    }

}
