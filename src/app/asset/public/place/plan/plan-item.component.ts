import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RoomFormService } from '../form.service';

@Component({
    templateUrl: 'plan-item.component.html',
})
export class PlanItemComponent {
    vm: any;
    labels: any;
    constructor(
        private route: ActivatedRoute,
        private service: RoomFormService) {
        this.route.params.subscribe(params => this.loadData(params['id']));
    }

    loadData(id: number) {
        this.service.loadItem(id, {forPlan: 'true'}).subscribe((dto: any) => {
            this.vm = dto.plan;
            this.labels = dto.labels;
            if (this.vm && this.vm.info) {
                this.vm.rooms = JSON.parse(this.vm.info);
            }
        });
    }
}
