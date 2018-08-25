import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminClassAttendanceService } from './admin-class-attendance.service';

@Component({
    templateUrl: 'admin-class-attendance-container.component.html',
})
export class AdminClassAttendanceContainerComponent {
    terms: number[];
    selectedTerm: number;
    adminClasses: any[];
    totalCount: number;

    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        private service: AdminClassAttendanceService,
    ) {
        this.route.data.subscribe((result: {
            data: {
                terms: number[],
                termId: number,
                adminClasses: any[],
            },
        }) => {
            this.terms = result.data.terms;
            this.selectedTerm = result.data.termId;
            this.adminClasses = result.data.adminClasses;
            this.totalCount = this.adminClasses.reduce((sum: number, item) => sum += item.count, 0);
        });
    }

    onTermChanged() {
        let id = this.route.firstChild.snapshot.params['id'];
        this.router.navigate([{ termId: this.selectedTerm }, id], { relativeTo: this.route });
    }
    
    get statisReportUrl() {
        return this.service.getStatisReportUrl(this.selectedTerm);
    }

    get detailReportUrl() {
        return this.service.getDetailReportUrl(this.selectedTerm);
    }

    get disqualReportUrl() {
        return this.service.getDisqualReportUrl(this.selectedTerm);
    }

    get isAdmin() {
        return this.service.isAdmin;
    }
}
