import { Component } from '@angular/core';

import { RoomFormService } from '../form.service';

@Component({
    templateUrl: 'plan-list.component.html',
})
export class PlanListComponent {
    plans: any[];
    termId: number;

    constructor(private service: RoomFormService) {
        this.loadData();
    }

    loadData() {
        this.service.loadList({forPlan: 'true'}).subscribe((dto: any) => {
            this.plans = dto;
        });
    }

    filterByTermId(termId: number) {
        return (plan: any) => plan.termId === termId || termId === undefined || termId === null;
    }
}
