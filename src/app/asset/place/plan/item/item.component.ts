import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonDialog } from 'core/common-dialogs';

import { PlanService } from '../../plan.service';

@Component({
    styleUrls: ['item.component.scss'],
    templateUrl: 'item.component.html',
})
export class PlanItemComponent {
    vm: any;
    labels: any;
    constructor(
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: PlanService) {
        this.route.params.subscribe(params => this.loadData(params['id']));
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe((dto: any) => {
            this.vm = dto.plan;
            this.labels = dto.labels;
            if (this.vm && this.vm.info) {
                this.vm.rooms = JSON.parse(this.vm.info);
            }
        });
    }

    finish() {
        this.dialog.confirm('完成', '确定计划已完成吗？').then(() => {
            this.service.finish(this.vm.id).subscribe(() => this.loadData(this.vm.id));
        });
    }

    doing() {
        this.dialog.confirm('执行', '确定计划要执行吗？').then(() => {
            this.service.process(this.vm.id).subscribe(() => this.loadData(this.vm.id));
        });
    }

    cancel() {
        this.dialog.confirm('取消', '确定取消计划吗？').then(() => {
            this.service.cancel(this.vm.id).subscribe(() => this.loadData(this.vm.id));
        });
    }

    toLabelStrings(ids: any): string {
        if (ids) {
            return this.labels.filter(item => ids.some(id => id === item.id))
                .map(label => label.labelName)
                .join(';');
        } else {
            return '';
        }
    }
}
