import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
        private service: PlanService) {
        this.route.params.subscribe(params =>
            this.service.loadItem(params['id']).subscribe((dto: any) => {
                this.vm = dto.plan;
                this.labels = dto.labels;
                if (this.vm && this.vm.info) {
                    this.vm.rooms = JSON.parse(this.vm.info);
                }
            }));
    }

    finish() {

    }

    doing() {

    }

    cancel() {

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
