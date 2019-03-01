import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectDepartmentService } from '../viewer.service';

@Component({
    templateUrl: 'project-item.component.html',
})
export class ProjectDepartmentItemComponent {
    vm: any;

    constructor(
        private route: ActivatedRoute,
        private service: ProjectDepartmentService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe(dto => {
            this.vm = dto;
        });
    }

    get changeAble(): boolean {
        return this.vm ? this.vm.projectStatus === 'INHAND' : false;
    }
}
