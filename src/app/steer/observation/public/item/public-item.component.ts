import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EvaluationMap, ObservationForm } from '../../form/shared/form.model';
import { PublicService } from '../public.service';

@Component({
    templateUrl: 'public-item.component.html',
})
export class PublicItemComponent {
    vm: ObservationForm;
    evaluationSystem: EvaluationMap[];

    constructor(
        private route: ActivatedRoute,
        private service: PublicService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem<{
            form: any,
            evaluationSystem: any,
        }>(params['id']).subscribe(dto => {
            this.vm = new ObservationForm(dto.form);
            this.evaluationSystem = dto.evaluationSystem;
        });
    }

}
