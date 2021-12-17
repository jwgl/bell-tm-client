import { Component } from '@angular/core';

import { PlanService } from '../../plan.service';

@Component({
    templateUrl: 'plan-list.component.html',
})
export class PlanListComponent {
    plans: any;
    termId: number;

    constructor(private service: PlanService) {
        this.loadData();
    }

    loadData() {
        this.service.loadList().subscribe((dto: any) => {
            this.plans = dto;
        });
    }

    filterByTermId(termId: number) {
        return (plan: any) => plan.termId === termId || termId === undefined || termId === null;
    }
}
