import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { SubmitOptions } from 'core/workflow';

import { ProjectFormService } from '../form.service';
import { ProjectForm } from '../shared/form.model';

@Component({
    templateUrl: 'item.component.html',
})
export class ProjectItemComponent {
    vm: ProjectForm;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProjectFormService,
        private dialogs: CommonDialog,
    ) {
        const params = this.route.snapshot.params;
        this.loadData( params['id']);
    }

    get submitOptions(): SubmitOptions {
        return {
            id: this.vm.id,
            type: 'check',
            what: this.vm.name,
        };
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            this.vm = new ProjectForm(dto);
        });
    }

    get editAble(): boolean {
        return (this.vm.status === 'CREATED' || this.vm.status === 'REJECTED') && this.vm.isValidDate;
    }

    get downloadUrl(): string {
        return this.service.getDownloadUrl(this.vm.id);
    }

    get submitAble(): boolean {
        return !_.isEmpty(this.vm.mainInfoForm);
    }

    remove() {
        this.dialogs.confirm('警告', `确定删除“${this.vm.name}” 吗？`).then(() =>
            this.service.delete(this.vm.id).subscribe(() =>
                this.router.navigate(['../../'], { relativeTo: this.route })));
    }
}
