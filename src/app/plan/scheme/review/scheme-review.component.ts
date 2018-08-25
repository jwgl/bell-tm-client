import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiUrl, Http } from 'core/rest';
import { ReviewOptions } from 'core/workflow';

import { Scheme } from '../shared/scheme.model';
import './scheme-review.model';

@Component({
    templateUrl: 'scheme-review.component.html',
})
export class SchemeReviewComponent {
    id: string;
    wi: string;
    vm: Scheme;

    constructor(
        route: ActivatedRoute,
        private http: Http,
        public api: ApiUrl,
    ) {
        route.params.subscribe(params => {
            this.id = params['id'];
            this.wi = params['wi'];
            this.http.get(this.api.workitem(this.id, this.wi)).subscribe(dto => this.onItemLoaded(dto));
        });
    }

    onItemLoaded(dto: any) {
        this.vm = new Scheme(dto);
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
