import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { ReportService } from '../report.service';

interface ObservationReport {
    supervisorId: string;
    supervisorName: string;
    departmentName: string;
    supervisorTimes: number;
    totalSection: number;
}

@Component({
    templateUrl: 'observation-report.component.html',
})
export class ObservationReportComponent {
    list: ObservationReport[];

    constructor(
        private route: ActivatedRoute,
        private service: ReportService,
    ) {
        this.route.params.subscribe(params => {
            const countBy = params['observer-type'] === '1' ? 'OBSERVER-U' : 'OBSERVER-C';
            this.service.loadList({ type: countBy }).subscribe((dto: any) => {
                this.list = dto.list;
                this.list.sort((a, b) => a.supervisorTimes - b.supervisorTimes);
            });
        });
    }
}
