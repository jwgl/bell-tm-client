import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dialog } from 'core/dialogs';

import { ProjectService } from '../viewer.service';
import { ProjectMemoDialog } from './memo.dialog';

@Component({
    templateUrl: 'project-item.component.html',
})
export class ProjectItemComponent {
    vm: any;
    saving = false;

    constructor(
        private route: ActivatedRoute,
        private service: ProjectService,
        private dialog: Dialog,
    ) {
        const params = this.route.snapshot.params;
        this.loadData(params['id']);
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            this.vm = dto;
        });
    }

    memo() {
        this.dialog.open(ProjectMemoDialog, { project: this.vm }).then(result => {
            this.service.update(this.vm.projectId, {memo: result}).subscribe(() => this.loadData(this.vm.projectId));
        });
    }
}
