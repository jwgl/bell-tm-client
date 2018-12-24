import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { ReviewOptions } from 'core/workflow';
import { Dialog } from 'core/dialogs';

import { ConclusionList } from '../../../settings/shared/constants';

import { ApprovalService } from './approval.service';
import { ProjectForm } from '../form/shared/form.model';
import { ConclusionForm } from './approval.model';
import { ConclusionDialog } from './conclusion.dialog';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class ApplicationApprovalItemComponent {
    form: ProjectForm;
    conclusionForm: ConclusionForm;

    private wi: string;
    private prevId: number;
    private nextId: number;
    id: number;
    type: string;
    projectCycle: number;
    saving = false;

    constructor(
        private service: ApprovalService,
        route: ActivatedRoute,
        private dialogs: CommonDialog,
        private dialog: Dialog,
    ) {
        route.params.subscribe(params => {
            this.id = params['id'];
            this.type = params['type'];
            this.service.loadApplicationItem(this.wi, this.id, this.type).subscribe((dto: any) => this.onItemLoaded(dto));
        });
    }

    onItemLoaded(dto: any) {
        this.form = new ProjectForm(dto.form);
        this.projectCycle = dto.form.period;
        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
        // 提取当前评审验收结论
        const reviews = this.form.relationReportTypes;
        if (reviews && reviews.length > 0) {
            const review = reviews.find((r: any) => r.reportType === this.form.reportType);
            if (review) {
                this.conclusionForm = new ConclusionForm(review);
            }
        }
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'CHECKED';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.form.id,
            wi: this.wi,
            type: 'approve',
            what: this.form.name,
        };
    }

    removeExpert(id: number) {
        this.saving = true;
        this.service.update(id, { removeExpert: true }).subscribe(() => {
            this.service.loadApplicationItem(this.wi, this.id, this.type).subscribe((dto: any) => this.onItemLoaded(dto));
        }, error => {
            this.saving = false;
            alert('专家清除失败：请检查是否有专家已经评审！');
        });
    }

    finish() {
        this.dialogs.confirm('提交', '提交后将不能再修改结论和意见，请确认要提交吗？').then(() =>
            this.service.finish(this.form.id, this.wi).subscribe(dto => this.onItemLoaded(dto))
        );
    }

    onConclusionChanged() {
        this.service.update(this.form.id, this.conclusionForm).subscribe(() => 1 === 1);
    }

    conclusionSetting() {
        this.dialog.open(ConclusionDialog, {
            level: this.form.level,
            conclusions: ConclusionList,
            conclusionForm: this.conclusionForm,
            projectCycle: this.projectCycle,
            reportType: this.form.reportType,
        }).then(result => {
            const form = new ConclusionForm(result);
            const validation = this.validate(form);
            if (validation.length) {
                this.dialogs.error(validation);
            } else {
                this.service.update(this.form.id, form).subscribe(() => {
                    this.dialogs.confirm('', '结论保存成功！').then(() =>
                        this.service.loadApplicationItem(this.wi, this.id, this.type).subscribe((dto: any) => this.onItemLoaded(dto))
                    );
                });
            }
        });
    }

    get downloadUrl(): string {
        return this.service.getDownloadUrl(this.form.id);
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(data: ConclusionForm): string[] {
        const validation: string[] = [];
        if (this.isEmpty(data.conclusionOfUniversity) ||
            this.isEmpty(data.opinionOfUniversity)) {
            validation.push('请检查结论和意见是否为空！');
        }
        if ((this.form.reportType === 1 && this.isEmpty(data.dateStarted)) &&
            ((this.form.level === 'PROVINCE' && data.conclusionOfProvince === 'OK') ||
            (this.form.level === 'UNIVERSITY' && data.conclusionOfUniversity === 'OK'))) {
                alert(this.form.reportType === 1);
            validation.push('请正确输入立项日期！');
        }
        return validation;
    }
}
