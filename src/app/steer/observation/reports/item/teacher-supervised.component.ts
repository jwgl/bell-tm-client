import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { ReportService } from '../report.service';

@Component({
    templateUrl: 'teacher-supervised.component.html',
})
export class TeacherSupervisedComponent {
    list: any[];
    type: string;

    constructor(
        private route: ActivatedRoute,
        private service: ReportService,
    ) {
        this.route.params.subscribe(params => {
            const countBy = (params['observer-type'] === '1') ? 'TEACHER-U' : 'TEACHER-C';
            this.service.loadList({ type: countBy }).subscribe(dto => {
                this.list = dto;
                this.list.sort((a, b) => b.supervisorTimes - a.supervisorTimes);
            });
        });
    }

    get departmentTitle(): string {
        if (this.type === 'university') {
            return '所在单位';
        } else {
            return '开课单位';
        }
    }
}
