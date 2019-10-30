import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FundViewService } from './fund-view.service';
const Columns = [
    {level: 'PROVINCE', reportType: 1},
    {level: 'PROVINCE', reportType: 3},
    {level: 'PROVINCE', reportType: 4},
    {level: 'UNIVERSITY', reportType: 1},
    {level: 'UNIVERSITY', reportType: 3},
    {level: 'UNIVERSITY', reportType: 4},
    {level: 'COLLEGE', reportType: 1},
    {level: 'COLLEGE', reportType: 3},
    {level: 'COLLEGE', reportType: 4},
];

@Component({
    templateUrl: 'fund-view.component.html',
})
export class FundViewComponent {
    projectName: string;
    funds: any[];
    columns = Columns;
    constructor(
        private route: ActivatedRoute,
        private service: FundViewService,
    ) {
        const params = this.route.snapshot.params;
        this.loadData(params['projectId']);
    }

    loadData(id: number) {
        this.service.loadFunds(id).subscribe((dto: any) => {
            this.projectName = dto.projectName;
            this.funds = dto.funds;
        });
    }

    getFund(type: string, level: string, reportType: number): number {
        if (this.funds) {
            const fund = this.funds.find(f => f.level === level && f.type === type && f.reportType === reportType);
            return fund ? fund.amount : null;
        } else {
            return null;
        }
    }
}
