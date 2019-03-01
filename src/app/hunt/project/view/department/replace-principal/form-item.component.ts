import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { SubmitOptions } from 'core/workflow';

import { ChangeFormService } from '../form.service';

@Component({
    templateUrl: 'form-item.component.html',
})
export class ChangeItemComponent {
    vm: any;
    project: any;
    saving = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ChangeFormService,
        private dialogs: CommonDialog,
    ) {
        const params = this.route.snapshot.params;
        this.loadData(params['id']);
    }

    get submitOptions(): SubmitOptions {
        return {
            id: this.vm.id,
            type: 'check',
            what: this.vm.name,
        };
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe((dto: any) => {
            this.vm = dto.form;
            this.project = dto.project;
        });
    }

    get editAble(): boolean {
        return (this.vm.status === 'CREATED' || this.vm.status === 'REJECTED');
    }

    remove() {
        this.dialogs.confirm('警告', `确定删除“${this.vm.name}” 吗？`).then(() =>
            this.service.delete(this.vm.id).subscribe(() =>
                this.router.navigate(['../..'], { relativeTo: this.route })));
    }
}
