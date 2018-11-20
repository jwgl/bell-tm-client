import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReviewOptions } from 'core/workflow';

import { ApprovalService } from './approval.service';
import { ProjectForm } from '../form/shared/form.model';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class ApplicationApprovalItemComponent {
    form: ProjectForm;

    private wi: string;
    private prevId: number;
    private nextId: number;
    id: number;
    type: string;
    saving = false;

    constructor(
        private service: ApprovalService,
        route: ActivatedRoute
    ) {
        route.params.subscribe(params => {
            this.id = params['id'];
            this.type = params['type'];
            this.service.loadApplicationItem(this.wi, this.id, this.type).subscribe((dto: any) => this.onItemLoaded(dto));
        });
    }

    onItemLoaded(dto: any) {
        this.form = new ProjectForm(dto.form);
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
        this.service.update(id, {removeExpert: true}).subscribe(() => {
            this.service.loadApplicationItem(this.wi, this.id, this.type).subscribe((dto: any) => this.onItemLoaded(dto));
        }, error => {
            this.saving = false;
            alert('专家清除失败：请检查是否有专家已经评审！');
        });
    }
}
