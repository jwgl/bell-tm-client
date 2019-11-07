import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dialog } from 'core/dialogs';

import { ProjectDepartmentService } from '../viewer.service';
import { TerminateComponent } from '../replace-principal/terminate.dialog';

@Component({
    templateUrl: 'project-item.component.html',
})
export class ProjectDepartmentItemComponent {
    vm: any;

    constructor(
        private route: ActivatedRoute,
        private service: ProjectDepartmentService,
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

    get changeAble(): boolean {
        return this.vm ? this.vm.projectStatus === 'INHAND' : false;
    }

    terminate() {
        this.dialog.open(TerminateComponent, {what: this.vm.name}).then(result => {
            const form = {projectId: this.vm.projectId, type: [5], reason: result.comment, title: `项目变更#${this.vm.id}`};
            this.service.create(form).subscribe(id => {
                this.loadData(this.vm.projectId);
            });
        });
    }
}
