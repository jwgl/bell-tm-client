import { Component } from '@angular/core';

import { ProjectTeacherService } from '../viewer.service';

@Component({
    templateUrl: 'project-list.component.html',
})
export class ProjectTeacherListComponent {
    subtypes: any;
    middleYears: any;
    knotYears: any;
    options: any;
    list: any;
    reportType: number;

    constructor(
        private service: ProjectTeacherService,
    ) {
        this.service.loadList(this.service.queryOptions).subscribe(dto => this.list = dto);
    }
}
