import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EvaluationMap, ObservationForm } from '../../form/shared/form.model';
import { ApprovalService } from '../approval.service';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class ApprovalItemComponent {
    vm: ObservationForm;
    evaluationSystem: EvaluationMap[];

    constructor(
        private route: ActivatedRoute,
        private service: ApprovalService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe((dto: any) => {
            this.vm = new ObservationForm(dto.form);
            this.evaluationSystem = dto.evaluationSystem;
        });
    }
}
