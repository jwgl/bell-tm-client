import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonDialog } from 'core/common-dialogs';
import { SubmitOptions } from 'core/workflow';

import { toVersionString } from '../../../shared/utils';
import { Vision } from '../../shared/vision.model';
import { VisionFormService } from '../vision-form.service';
import './form-item.model';

/**
 * 所有者培养方案。
 */
@Component({
    templateUrl: 'form-item.component.html',
})
export class VisionFormItemComponent {
    vm: Vision;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: VisionFormService,
    ) {
        this.route.params.subscribe(params => {
            this.loadItem(parseInt(params['id'], 10));
        });
    }

    loadItem(id: number) {
        this.service.loadItem<{
            editable: boolean,
            revisable: boolean,
        }>(id).subscribe(dto => {
            this.vm = new Vision(dto);
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
        };
    }
}
