import { Component } from "@angular/core";

import { MisconductCheckService } from './misconduct-check.service';

@Component({
    styleUrls: ['./misconduct-check.component.scss'],
    templateUrl: './misconduct-check.component.html'
})
export class MisconductCheckComponent {
    statuses = [
        { value: 'todo', label: '待核实' },
        { value: 'done', label: '已处理' },
    ];

    constructor(public service: MisconductCheckService) {
        this.service.loadCounts();
    }

    statusCount(status: string): number {
        const count = this.service.counts[status]
        return count ? count : 0;
    }
}
