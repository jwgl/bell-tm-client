import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonDialog } from 'core/common-dialogs';
import { ReviewOptions } from 'core/workflow';

import { ConclusionList } from '../../../settings/shared/constants';

import { ApprovalService } from './approval.service';
import { ProjectForm } from '../form/shared/form.model';
import { ConclusionForm } from './approval.model';

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
    saving = false;
    conclusions = ConclusionList;

    constructor(
        private service: ApprovalService,
        route: ActivatedRoute,
        private dialogs: CommonDialog,
    ) {
        route.params.subscribe(params => {
            this.id = params['id'];
            this.type = params['type'];
            this.service.loadApplicationItem(this.wi, this.id, this.type).subscribe((dto: any) => this.onItemLoaded(dto));
        });
    }

    onItemLoaded(dto: any) {
        this.form = new ProjectForm(dto.form);
        this.conclusionForm = new ConclusionForm(dto.form);
        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
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
}
