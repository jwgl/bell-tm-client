import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiUrl, Http } from 'core/rest';
import { ReviewOptions } from 'core/workflow';

import { Vision } from '../shared/vision.model';
import './vision-review.model';

@Component({
    templateUrl: 'vision-review.component.html',
})
export class VisionReviewComponent {
    id: string;
    wi: string;
    vm: Vision;

    constructor(
        route: ActivatedRoute,
        private http: Http,
        private api: ApiUrl,
    ) {
        route.params.subscribe(params => {
            this.id = params['id'];
            this.wi = params['wi'];
            this.http.get(this.api.workitem(this.id, this.wi)).subscribe(dto => this.onItemLoaded(dto));
        });
    }
    onItemLoaded(dto: any) {
        this.vm = new Vision(dto);
        this.vm.activity = dto.activity;
    }

    get reviewable(): boolean {
        return (this.vm.status === 'SUBMITTED' && this.vm.activity === 'check')
            || (this.vm.status === 'CHECKED' && this.vm.activity === 'approve');
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.id,
            wi: this.wi,
            type: this.vm.activity,
            what: this.vm.workflowTitle,
        };
    }
}
