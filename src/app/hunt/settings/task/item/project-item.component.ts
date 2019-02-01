import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormService } from '../form.service';

@Component({
    templateUrl: 'project-item.component.html',
})
export class ProjectItemComponent {
    vm: any;

    constructor(
        private route: ActivatedRoute,
        private service: FormService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadProjectItem(params['id'], params['applicationId']).subscribe(dto => {
            this.vm = dto;
        });
    }

    get downloadUrl(): string {
        return this.service.getDownloadUrl(this.vm.taskId, this.vm.id);
    }
}
