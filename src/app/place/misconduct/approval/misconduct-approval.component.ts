import { Component } from '@angular/core';

import { MisconductApprovalService } from './misconduct-approval.service';

@Component({
    styleUrls: ['./misconduct-approval.component.scss'],
    templateUrl: './misconduct-approval.component.html'
})
export class MisconductApprovalComponent {
    statuses = [
        { value: 0, label: '待处理' },
        { value: 1, label: '待学院核实' },
        { value: 2, label: '学院已处理' },
        { value: 3, label: '已核实' },
        { value: 4, label: '不违规' },
    ];

    constructor(public service: MisconductApprovalService) {
        this.service.loadCounts();
    }

    statusCount(status: number): number {
        const count = this.service.counts[status];
        return count ? count : 0;
    }
}
