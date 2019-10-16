import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReviewOptions, RevokeOptions } from 'core/workflow';

import { CheckService } from './check.service';
import { ProjectForm } from '../form/shared/form.model';

@Component({
    templateUrl: 'check-item.component.html',
})
export class ApplicationCheckItemComponent {
    form: ProjectForm;

    private wi: string;
    private prevId: number;
    private nextId: number;

    rollbackAble: boolean;

    constructor(
        private service: CheckService,
        route: ActivatedRoute,
    ) {
        route.params.subscribe(params => {
            this.service.loadApplicationItem(this.wi, params['id'], params['type']).subscribe((dto: any) => this.onItemLoaded(dto));
        });
    }

    onItemLoaded(dto: any) {
        this.form = new ProjectForm(dto.form);
        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
        this.rollbackAble = dto.rollbackAble && this.form.isValidDate;
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'SUBMITTED' && this.form.isValidDate;
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.form.id,
            wi: this.wi,
            type: 'check',
            what: this.form.name,
            reviews: [{id: 'OK', name: '通过'}, {id: 'VETO', name: '不通过'}, {id: 'DELAY', name: '暂缓通过'}],
        };
    }

    get rollbackOptions(): RevokeOptions {
        return {
            id: this.form.id,
            what: this.form.name,
        };
    }
}
