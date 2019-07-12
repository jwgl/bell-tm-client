import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { Dialog } from 'core/dialogs';
import { CommonDialog } from 'core/common-dialogs';
import { WorkflowSubmitDialog } from 'core/workflow/submit.dialog';

import { InspectDialog } from '../inspect/inspect.dialog';
import { ProjectFormService } from '../form.service';
import { ProjectForm, PropertyCommentForSubmit } from '../shared/form.model';
import { ContentLabels } from '../../shared/constants';

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

    get review(): any {
        const reviews = this.vm.relationReportTypes;
        if (reviews && reviews.length > 0) {
            return reviews.find((r: any) => r.reportType === this.vm.reportType);
        }
        return null;
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(): string[] {
        const validation: string[] = [];
        if (this.vm.reportType === 1) {
            _.forEach(PropertyCommentForSubmit, (value: string, key: string) => {
                if (this.isEmpty(this.vm[key])) {
                    validation.push(`${value}为空`);
                }
            });
        }
        const review = this.vm.relationReportTypes.find((item: any) => item.reportType === this.vm.reportType);
        if (review) {
            if (this.isEmpty(review.content)) {
                validation.push(`${ContentLabels.content[this.vm.reportType]}为空！`);
            }
            if (this.vm.reportType === 1 && this.isEmpty(review.achievements)) {
                validation.push('预期成果为空！');
            }
            if (this.isEmpty(review.mainInfoForm)) {
                validation.push('申报书为空！');
            }
        }
        return validation;
    }

    submit(): void {
        const validate = this.validate();
        if (validate.length) {
            this.dialogs.error(validate);
        } else {
            this.saving = true;
            this.dialog.open(WorkflowSubmitDialog, {
                whoUrl: `${this.service.api.item(this.vm.id)}/checkers`,
                does: '审核',
                what: this.vm.name,
            }).then(result => {
                this.service.submit(this.vm.id, {
                    title: result.what,
                    to: result.to,
                    comment: result.comment,
                }).subscribe(() => {
                    this.loadData(this.vm.id);
                });
            });
        }
    }

    remove() {
        this.dialogs.confirm('警告', `确定删除“${this.vm.name}” 吗？`).then(() =>
            this.service.delete(this.vm.id).subscribe(() =>
                this.router.navigate(['../../'], { relativeTo: this.route })));
    }

    inspect() {
        this.service.loadItemForEdit(this.vm.id).subscribe(dto => {
            const form = dto;
            const uploadUrl = this.service.getUploadUrl({ taskId: this.vm.reviewTaskId });
            this.dialog.open(InspectDialog, { form, uploadUrl }).then(result => {
                if (result.validation && result.validation.length > 0) {
                    this.dialogs.error(result.validation);
                } else {
                    this.saving = true;
                    result.form.fileTypes.forEach((item: any) => {
                        switch (item.prefix) {
                            case 'main':
                                result.form.mainInfoForm = item.names.length > 0 ? item.names[0] : null;
                                break;
                            case 'proof':
                                result.form.proofFile = item.names;
                                break;
                            case 'summary':
                                result.form.summaryReport = item.names.length > 0 ? item.names[0] : null;
                        }
                    });
                    this.service.update(this.vm.id, result.form).subscribe(() => {
                        this.loadData(this.vm.id);
                        this.saving = false;
                    });
                }
            });
        });
    }

}
