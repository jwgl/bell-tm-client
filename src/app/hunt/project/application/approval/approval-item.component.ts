import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReviewOptions } from 'core/workflow';

import { ProjectForm } from '../form/shared/form.model';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class ApplicationApprovalItemComponent {
    form: ProjectForm;

    private wi: string;
    private prevId: number;
    private nextId: number;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
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
}
