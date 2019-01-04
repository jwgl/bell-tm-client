import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    taskId: number;
    list: any;
    reportType: number;

    constructor(
        private route: ActivatedRoute,
        private service: ProjectDepartmentService,
        private dialog: Dialog,
    ) {
        const params = this.route.snapshot.params;
        this.taskId = params['id'];
        this.service.loadDataForCreate().subscribe((dto: any) => {
            this.subtypes = dto.subtypes;
            this.middleYears = dto.middleYears;
            this.knotYears = dto.knotYears;
        });
    }

    query() {
        this.dialog.open(ProjectOptionDialog, {
            subtypes: this.subtypes,
            middleYears: this.middleYears,
            knotYears: this.knotYears,
        }).then(result => {
            this.service.loadList(result).subscribe(dto => this.list = dto);
        });
    }
}
