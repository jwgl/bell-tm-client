import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonDialog } from 'core/common-dialogs';
import { SubmitOptions } from 'core/workflow';

import { Scheme, SchemeDto } from '../../shared/scheme.model';
import { SchemeFormService } from '../scheme-form.service';
import './form-item.model';

/**
 * 所有者教学计划。
 */
@Component({
    templateUrl: 'form-item.component.html',
})
export class SchemeFormItemComponent {
    vm: Scheme;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: SchemeFormService,
    ) {
        this.route.params.subscribe(params => {
            this.loadItem(parseInt(params['id'], 10));
        });
    }

    loadItem(id: number) {
        this.service.loadItem<SchemeDto>(id).subscribe(dto => {
            this.vm = new Scheme(dto);
            this.vm.editable = dto.editable;
            this.vm.revisable = dto.revisable;
        });
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.vm.id).subscribe(() => {
                this.router.navigate(['../'], { relativeTo: this.route });
            });
        });
    }

    get submitOptions(): SubmitOptions {
        return {
            id: this.vm.id,
            type: 'check',
            what: this.vm.workflowTitle,
            validate: this.vm.checkCredit.bind(this.vm),
        };
    }
}
