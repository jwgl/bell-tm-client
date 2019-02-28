import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { Dialog } from 'core/dialogs';
import { CommonDialog } from 'core/common-dialogs';
import { SubmitOptions } from 'core/workflow';

import { InspectDialog } from '../inspect/inspect.dialog';
import { ProjectFormService } from '../form.service';
import { ProjectForm } from '../shared/form.model';

@Component({
    templateUrl: 'item.component.html',
})
export class ProjectItemComponent {
    vm: ProjectForm;
    saving = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProjectFormService,
        private dialogs: CommonDialog,
        private dialog: Dialog,
    ) {
        const params = this.route.snapshot.params;
        this.loadData(params['applicationId']);
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
        if (!this.review) {
            return (this.vm.status === 'CREATED' || this.vm.status === 'REJECTED') && this.vm.isValidDate;
        }
        return (this.review.status === 'CREATED' || this.review.status === 'REJECTED') && this.vm.isValidDate;
    }

    get removAble(): boolean {
        if (!this.review) {
            return this.vm.reportType === 1;
        }
        return this.review.reportType === 1;
    }

    get submitAble(): boolean {
        const review = this.review;
        return review ? !_.isEmpty(review.mainInfoForm) : false;
    }

    get review(): any {
        const reviews = this.vm.relationReportTypes;
        if (reviews && reviews.length > 0) {
            return reviews.find((r: any) => r.reportType === this.vm.reportType);
        }
        return null;
    }

    remove() {
        this.dialogs.confirm('警告', `确定删除“${this.vm.name}” 吗？`).then(() =>
            this.service.delete(this.vm.id).subscribe(() =>
                this.router.navigate(['../../'], { relativeTo: this.route })));
    }

    inspect() {
        this.service.loadItemForEdit(this.vm.id).subscribe(dto => {
            const form = dto;
            const uploadUrl = this.service.getUploadUrl({ taskId: this.vm.reviewTaskId});
            this.dialog.open(InspectDialog, { form, uploadUrl }).then(result => {
                if (result.validation && result.validation.length > 0) {
                    this.dialogs.error(result.validation);
                } else {
                    this.saving = true;
                    this.service.update(this.vm.id, result.form).subscribe(() => {
                        this.loadData(this.vm.id);
                        this.saving = false;
                    });
                }
            });
        });
    }

}
