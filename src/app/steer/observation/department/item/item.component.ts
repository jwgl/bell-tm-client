import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { ObservationFormService } from '../dean.service';
import { EvaluationItem, EvaluationMap, ObservationForm } from '../../form/shared/form.model';

@Component({
    templateUrl: 'item.component.html',
})
export class DeanItemComponent {
    vm: ObservationForm;
    evaluationSystem: EvaluationMap[];
    activeTermId: number;

    constructor(
        private route: ActivatedRoute,
        private service: ObservationFormService,
    ) {
        this.route.params.subscribe(params => {
            this.loadData(params['id']);
        });
    }

    loadData(id: number) {
        this.service.loadItem<{
            form: any,
            evaluationSystem: any[],
            activeTermId: any,
        }>(id).subscribe(dto => {
            this.vm = new ObservationForm(dto.form);
            this.evaluationSystem = dto.evaluationSystem;
            this.activeTermId = dto.activeTermId;
        });
    }

    validate(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    get evaluateList(): any[] {
        return _.chain(this.evaluationSystem).map(data => data.value).flatten().map((item: EvaluationItem) => item.value).value();
    }
}
