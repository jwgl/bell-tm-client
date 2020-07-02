import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectTeacherService } from '../viewer.service';

@Component({
    templateUrl: 'project-item.component.html',
})
export class ProjectTeacherItemComponent {
    vm: any;

    constructor(
        private route: ActivatedRoute,
        private service: ProjectTeacherService,
    ) {
        const params = this.route.snapshot.params;
        this.loadData(params['id']);
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            this.vm = dto;
        });
    }
}
